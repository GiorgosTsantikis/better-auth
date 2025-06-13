import {createAccessControl} from "better-auth/plugins/access";

const statement = {
    users: ["create", "update", "delete", "view"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
    users: ["view"],
});

export const admin = ac.newRole({
    users: ["create", "update", "delete", "view"],
});
