type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions<TBody = unknown> {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: TBody;
    credentials?: RequestCredentials;
}


export async function useApi<TResponse, TBody = unknown>(
    url: string,
    token: string,
    refresh:  ()=>Promise<string>,
    options?: ApiOptions<TBody>
): Promise<TResponse> {
    const { method = 'GET', headers = {}, body } = options || {};

    const fetchWithToken = async (authToken: string): Promise<Response> => {
        return await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });
    };

    let res = await fetchWithToken(token);

    if (res.status === 401 || res.status === 403) {
        console.warn("Token expired or invalid. Trying to refresh...");
        const freshToken = await refresh();
        if (!freshToken) throw new Error("Could not refresh token");

        res = await fetchWithToken(freshToken);
    }

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} ${res.statusText} - ${text}`);
    }

    const data: TResponse = await res.json();
    return data;
}
