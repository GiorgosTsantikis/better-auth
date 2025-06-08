import {betterAuth} from "better-auth";
import {Pool} from "pg";
import {nextCookies} from "better-auth/next-js";

//TODO with backend
async function sendEmail({to, subject, text}:{to: string, subject: string, text: string}){
    await new Promise(resolve => setTimeout(resolve, 1));
    console.log(to, subject, text);
}
export const auth = betterAuth({
    database: new Pool({
        connectionString: "postgres://postgres:postgres@localhost:5432/db"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        sendResetPassword: async({user,url,token}, request)=>{
            console.log(request, token);
            await sendEmail({
                to: user.email,
                subject: "reset password",
                text: `Click the link to reset your password ${url}`,
            });
        }
    },
    account: {
        accountLinking: {
            enabled: true,
        },
    },
    socialProviders: {
        google: {//to be added
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        },
    },
    plugins: [nextCookies()],
});