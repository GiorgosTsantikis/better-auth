import {betterAuth} from "better-auth";
import {Pool} from "pg";
import {nextCookies} from "better-auth/next-js";
import {admin as adminPlugin, phoneNumber, jwt, openAPI} from "better-auth/plugins";
import {ac, admin, user} from "@/lib/auth/permissions";

async function sendOneTimePass({phoneNumber, code}:{phoneNumber:string,code:string},request:any){
    //todo
    await new Promise(resolve => setTimeout(resolve, 1));
    console.log(phoneNumber, code);
}

async function sendEmail({to, subject, text}:{to: string, subject: string, text: string}){
    //TODO with backend
    await new Promise(resolve => setTimeout(resolve, 1));
    console.log(to, subject, text);
}
const dbConn = process.env.DB_CONNECTION_STRING;
console.log("dbConn",dbConn);
export const auth =  betterAuth({
    database: new Pool({
        connectionString: dbConn
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
    session: {
      expiresIn: 60 * 60 * 10,
      updateAge: 60 * 60,
      cookieCache: {
          enabled: true,
          maxAge: 10 * 60,
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
    plugins: [
        nextCookies(),
        jwt({
            jwt:{
                expirationTime: "1m"
            }
        }),
        adminPlugin({ac, roles:{admin,user}}),
        phoneNumber({
            sendOTP: sendOneTimePass,
        }),
    openAPI()],
});