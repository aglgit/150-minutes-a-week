import { createContext, useContext } from "react";

export const UserContext = createContext<{
    name: string;
    email: string;
} | null>(null);

export function useUser() {
    return useContext(UserContext);
}
