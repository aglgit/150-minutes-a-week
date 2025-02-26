import { createContext, useContext } from "react";
import { UserInfo } from "../schema/schema";

export const UserContext = createContext<UserInfo | null>(null);

export function useUser() {
    return useContext(UserContext);
}
