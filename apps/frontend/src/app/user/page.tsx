"use client";

import { useEffect, useState } from "react";

const UserPage: React.FC = () => {
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

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.name}!</p>
                    <p>Your mail is: {user.email}</p>
                    <button
                        onClick={() =>
                            (window.location.href =
                                "http://localhost:8080/logout")
                        }
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button
                    onClick={() =>
                        (window.location.href =
                            "http://localhost:8080/oauth2/authorization/google")
                    }
                >
                    Login with Google
                </button>
            )}
        </div>
    );
};

export default UserPage;
