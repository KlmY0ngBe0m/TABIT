"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        setErrorMessage("");
        setIsLoading(true);


        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                setErrorMessage("관리자 비밀번호가 올바르지 않습니다.");
                return;
            }

            router.push("/admin/stats");
        } catch {
            setErrorMessage("로그인 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <section className="admin-login-card">
                <p className="result-badge">Admin</p>
                <h1>TABIT 관리자 로그인</h1>
                <p>추천 기록 통계를 확인하려면 관리자 비밀번호를 입력하세요.</p>

                <label htmlFor="admin-password">관리자 비밀번호</label>
                <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleLogin();
                        }
                    }}
                    placeholder="비밀번호를 입력하세요."
                />

                {errorMessage !== "" && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <button type="button" onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? "로그인 중..." : "로그인"}
                </button>
            </section>
        </main>
    );
}