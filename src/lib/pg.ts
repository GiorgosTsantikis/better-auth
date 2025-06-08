import {Pool} from "pg";

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
});

export function emailExists(email: string)  {
    console.log("emailExists", email, pool.options.connectionString);
    return false;
}