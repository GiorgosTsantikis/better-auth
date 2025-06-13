import {User} from "@/model/db/User";

interface SessionDTO{
    id: string;
    token: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;

}

export interface Session{
    session:SessionDTO
    user:User
}