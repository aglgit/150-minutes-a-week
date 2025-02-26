"use client";

import { UserInfo } from "@/lib/schema/schema";
import { UserContext } from "@/lib/user/userContext";
import { useEffect, useState } from "react";

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        fetch("api/users", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                return setUser(data);
            })
            .catch(() => setUser(null));
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
