"use client";

import { UserContext } from "@/lib/user/userContext";
import { useEffect, useState } from "react";

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(
        null
    );

    useEffect(() => {
        fetch("http://localhost:8080/users", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                return setUser(data);
            })
            .catch(() => setUser(null));
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
