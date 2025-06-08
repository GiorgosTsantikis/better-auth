'use server';

import {auth} from "@/lib/auth/auth";
import {APIError} from "better-auth/api";
import {redirect} from "next/navigation";
import {revokeOtherSessions, revokeSessions} from "@/lib/auth/auth-client";

type State = {
    errorMessage?: string | null;
} | undefined;

export async function signUp(prevState: State, formData: FormData){
    const rawFormData = {
        email: formData.get("email") as string,
        password: formData.get("pwd") as string,
        username: formData.get("username") as string,
    }
    console.log('data', formData);
    const {email,password,username} = rawFormData;
    try{
        await auth.api.signUpEmail({
            body: {
                name: `${username}`,
                email: email,
                password: password,
            }
        })
    }catch(err){
        if(err instanceof APIError){
            switch(err.status){
                case "UNPROCESSABLE_ENTITY":
                    return {errorMessage:"User already exists"};
                case "BAD_REQUEST":
                    return {errorMessage:"Invalid email"};
                default:
                    return {errorMessage:"something went wrong"};
            }
        }
    }
    redirect("/dashboard");
}

export async function signIn(prevState: State, formData: FormData){
    const rawFormData = {
        email: formData.get("email") as string,
        password: formData.get("pwd") as string,
    }
    console.log('data', formData);
    const {email,password} = rawFormData;
    try{
        const resp = await auth.api.signInEmail({
            body: {
                email: email,
                password: password,
            }
        });
    }catch(err){
        if(err instanceof APIError){
            switch(err.status){
                case "UNAUTHORIZED":
                    return {errorMessage:"User not found"};
                case "BAD_REQUEST":
                    return {errorMessage:"Invalid email"};
                default:
                    return {errorMessage:"something went wrong"};
            }
        }
        console.error("sign in with email failed",err);
    }
    redirect("/dashboard");
}
