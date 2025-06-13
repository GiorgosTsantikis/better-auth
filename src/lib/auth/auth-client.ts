import {createAuthClient} from "better-auth/react";
import {adminClient, phoneNumberClient} from "better-auth/client/plugins";
import {ac, user, admin} from "@/lib/auth/permissions";

export const {signIn, getSession,revokeSession, revokeSessions, revokeOtherSessions,signUp, signOut, forgetPassword, resetPassword} =
    createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL as string,
    plugins:[
        adminClient({
        ac, roles:{
            admin,user}
    }),
        phoneNumberClient()]
});