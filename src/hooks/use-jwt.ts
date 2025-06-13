// hooks/useJwt.ts
import { useState, useEffect } from "react";

let jwtToken: string | null = null;

export function useJwt() {
    const [token, setToken] = useState<string | null>(jwtToken);
    const [loading, setLoading] = useState<boolean>(!jwtToken);
    const [error, setError] = useState<string | null>(null);

    const fetchJWT = async () => {
        try {
            const jwtEndpoint = process.env.NEXT_PUBLIC_JWT_ENDPOINT!;
            const res = await fetch(jwtEndpoint, {
                method: "GET",
                credentials: "include", // include cookies
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Fetch failed: ${res.status} ${text}`);
            }

            const { token } = await res.json();
            jwtToken = token; // cache in memory
            setToken(token);
            return token;
        } catch (err: any) {
            setError(err.message || "Failed to get JWT");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (jwtToken) {
            console.log("token already cached",jwtToken);
            return;
        } // already cached
        console.log("fetching new token");
        fetchJWT();
    }, []);

    return { token, loading, error, fetchJWT};
}
