"use client";


import {Input} from "@/components/ui/input";
import {forgetPassword} from "@/lib/auth/auth-client";
import {useState} from "react";
import React from "react";

export default function ForgotAccountPage(){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    //TODO backend api-call
    async function handleSubmit(e : React.FormEvent){
        e.preventDefault();
        if (typeof email !== "string" || !email.includes("@")) {
            setMessage("Please enter a valid email");
            return;
        }
        const {error} = await forgetPassword({
            email:email,
            redirectTo:`${window.location.origin}/login/forgot-password/reset-password`
        });
        if(error){
            setMessage("Something went wrong");
        }else{
            setMessage("An email has been sent to proceed with the password reset");
            setEmail("");
        }

    }
    return (
        <form onSubmit={handleSubmit}
        className={"p-6 max-w-md mx-auto space-y-4 container"}>
        <h1 className={"text-xl font-bold"}>Forgot Password?</h1>
            <Input type={"email"} required value={email} placeholder={"Your email"}
                   onChange={(e)=>setEmail(e.target.value)}
                   className={"w-full border p-2"}/>
            {message && <p>{message}</p>}
        </form>
    )
}