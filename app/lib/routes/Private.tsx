"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { useRouter } from "next/navigation";
import { BarLoader } from "react-spinners";

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps) {
    const { signed, loadingAuth } = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loadingAuth) {
            setIsLoading(false);
        }
    }, [loadingAuth]);

    useEffect(() => {
        if (!isLoading && !signed) {
            router.push("/login"); // Redirect to login page
        }
    }, [isLoading, signed, router]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <BarLoader color={"#DC3237"} loading={true} />
            </div>
        );
    }

    return <>{children}</>;
}
