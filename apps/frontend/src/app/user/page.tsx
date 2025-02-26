"use client";

import { useUser } from "@/lib/user/userContext";

const UserPage: React.FC = () => {
    const user = useUser();

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
