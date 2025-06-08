import {createAuthClient} from "better-auth/react";

export const {signIn, revokeSession, revokeSessions, revokeOtherSessions,signUp, signOut, useSession, forgetPassword, resetPassword} =
    createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL as string,
    fetchOptions:{
        onSuccess: (ctx)=>{
            const authToken = ctx.response.headers.get("set-auth-token");
            if(authToken){
                localStorage.setItem("session-token",authToken);
            }
        }
    }
})