export type User = {
    id: string; // UUID
    email: string | null;
    emailVerified: Date | null;
    phone: string | null;
    phoneVerified: Date | null;
    username: string | null;
    displayName: string | null;
    avatarUrl: string | null;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
};
