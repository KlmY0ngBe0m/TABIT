import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type RecommendationLog = {
    selected_region: string | null;
    recommended_city: string | null;
    travel_style: string | null;
    interests: string[] | null;
    days: number | null;
    people_count: number | null;
};

function countValues(values: string[]) {
    const counts = values.reduce<Record<string, number>>((acc, value) => {
        if (value === "") return acc;

        acc[value] = (acc[value] ?? 0) + 1;
        return acc;
    }, {});

    return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

function getAverage(values: number[]) {
    if (values.length === 0) return 0;

    const total = values.reduce((sum, value) => sum + value, 0);
    return Math.round((total / values.length) * 10) / 10;
}

export async function GET() {
    const { data, error } = await supabaseAdmin
    .from("recommendation_logs")
    .select(
        "selected_region, recommended_city, travel_style, interests, days, people_count"
    )
    .order("created_at", {ascending: false})
    .limit(1000);

    if (error) {
        console.error("Supabase stats error", error);
        return NextResponse.json(
            { message: "Failed to load recommendation stats"},
            { status: 500 }
        );
    }

    const logs = (data ?? []) as RecommendationLog[];

    const days = logs
    .map((log) => log.days)
    .filter((value): value is number => typeof value === "number");

    const peopleCounts = logs
    .map((log) => log.people_count)
    .filter((value): value is number => typeof value === "number");

    return NextResponse.json({
        totalCount: logs.length,
        averageDays: getAverage(days),
        averagePeopleCount: getAverage(peopleCounts),
        regionRanking: countValues(logs.map((log) => log.selected_region ?? "")).slice(0, 5),
        cityRanking: countValues(logs.map((log) => log.recommended_city ?? "")).slice(0, 5),
        travelStyleRanking: countValues(logs.map((log) => log.travel_style ?? "")).slice(0, 5),
        interestRanking: countValues(logs.flatMap((log) => log.interests ?? [])).slice(0, 5),
    });
}
