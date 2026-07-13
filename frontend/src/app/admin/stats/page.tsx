import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type RankingItem = {
    label: string;
    count: number;
};

type StatsData = {
    totalCount: number;
    averageDays: number;
    averagePeopleCount: number;
    regionRanking: RankingItem[];
    cityRanking: RankingItem[];
    travelStyleRanking: RankingItem[];
    interestRanking: RankingItem[];
};

async function getStats(): Promise<StatsData> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/stats`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to load stats");
    }

    return response.json();
}

function RankingList({ title, items }: { title: string, items: RankingItem[] }) {
    return (
        <section className="stats-card">
            <h2>{title}</h2>

            {items.length === 0 ? (
                <p className="stats-empty">아직 데이터가 없습니다.</p>
            ) : (
                <ul className="stats-list">
                    {items.map((item) => (
                        <li key={item.label}>
                            <span>{item.label}</span>
                            <strong>{item.count}건</strong>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default async function AdminStatsPage() {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("tabit_admin")?.value === "true";

    if (!isAdmin) {
        redirect("/admin/login");
    }

    const stats = await getStats();

    return (
        <main>
            <section className="admin-stats-header">
                <p className="result-badge">Admin Dashboard</p>
                <h1>추천 기록 통계</h1>
                <p>추천 기록을 기반으로 한 관리자용 통계입니다.</p>
            </section>

            <section className="stats-summary-grid">
                <div className="stats-card">
                    <span>총 추천 수</span>
                    <strong>{stats.totalCount}건</strong>
                </div>

                <div className="stats-card">
                    <span>평균 여행 기간</span>
                    <strong>{stats.averageDays}일</strong>
                </div>

                <div className="stats-card">
                    <span>평균 인원수</span>
                    <strong>{stats.averagePeopleCount}명</strong>
                </div>
            </section>

            <section className="stats-grid">
                <RankingList title="추천 도시 TOP 5" items={stats.cityRanking} />
                <RankingList title="선택 지역 TOP 5" items={stats.regionRanking} />
                <RankingList title="관심사 TOP 5" items={stats.interestRanking} />
                <RankingList title="여행 스타일 TOP 5" items={stats.travelStyleRanking} />
            </section>
        </main>
    );
}
