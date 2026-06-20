export const memberType = ["user" as const, "non-user" as const];
export type MemberType = (typeof memberType)[number];
