export type Session = {
    id: string; // UUID
    userId: string;
    activeExpires: Date;
    idleExpires: Date;
};
