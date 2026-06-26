import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    return NextResponse.json({
        recommendedCity: "도쿄",
        recommendationReason: "AI 연결 전 테스트 응답입니다.",
        estimatedBudget: "약 80만 원",
        samplePlan: [
            "1일차: 도쿄 도착",
            "2일차: 시내 관광",
            "3일차: 쇼핑",
        ],
        receivedInput: body,
    });
}