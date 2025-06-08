"use client";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {resetPassword} from "@/lib/auth/auth-client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Page(){
    const [ password, setPassword ] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [message, setMessage] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    useEffect(()=>{
        if(!token){
            setMessage("Invalid token");
        }
    },[token]);

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        if(!token){return;}
        if(verifyPassword !== password || !verifyPassword || verifyPassword.length < 8){
            setMessage("Password must be at least 8 characters and match verify password");
            return;
        }
        const {error} = await resetPassword({
            token,
            newPassword: password,
        });
        if (error){
            setMessage("Reset failed");
        }else{
            setMessage("Password reset successfully");
            setTimeout(()=>router.push("/login"), 1000);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor={"np"}>New Password:</Label>
            <Input name={"np"} id={"np"} value={password} type={"password"} onChange={e => setPassword(e.target.value)} />
            <Label htmlFor={"vp"}>Verify Password:</Label>
            <Input name={"vp"} id={"vp"} value={password} type={"password"} onChange={e => setVerifyPassword(e.target.value)} />
        </form>
    )
}