"use client";
import {Button} from "@/components/ui/button";
import {signIn} from "@/lib/auth/auth-client";


export default function SignInSocial({
    provider, children}:{provider:
        | "google" | "facebook";
    children:React.ReactNode; }) {
    return (
        <Button onClick={async() =>{
            await signIn.social({
                provider, callbackURL:"/dashboard",
            })
        }} type={"button"} variant={"outline"}>
            {children}
        </Button>
    )
}