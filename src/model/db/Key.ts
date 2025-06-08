export type Key = {
    id: string; // usually `${provider}:${providerUserId}` or similar
    userId: string;
    hashedPassword: string | null;
    primary: boolean;
    expires: Date | null;
};
