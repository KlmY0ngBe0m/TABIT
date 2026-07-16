"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogout() {
        setIsLoading(true);

        await fetch("/api/admin/logout", {
            method: "POST",
        });

        router.push("/admin/login");
        router.refresh();
    }

    return (
        <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
            disabled={isLoading}
        >
            {isLoading ? "로그아웃 중..." : "로그아웃"}
        </button>
    );
}