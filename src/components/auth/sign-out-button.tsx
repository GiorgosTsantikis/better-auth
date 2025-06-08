"use client";
import {useRouter} from "next/navigation";
import {Icons} from "@/components/icons";
import {signOut} from "@/lib/auth/auth-client";

export default function SignOutButton() {
    const router = useRouter();
    return(
        <div onClick={async () => {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                    }
                }
            })
        }} className={"flex items-center justify-between w-18 cursor-pointer"}>
            <Icons.logOut/>
            Log out
        </div>
    )
}