import {auth} from "@/lib/auth/auth";
import {toNextJsHandler} from "better-auth/next-js";
//catch all route
export const {POST, GET} = toNextJsHandler(auth);