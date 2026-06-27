import { NextResponse } from "next/server";

function createFallbackRecommendation(interests: string[]) {
  if (interests.includes("nature")) {
    return {
      recommendedCity: "삿포로",
      recommendationReason:
        "자연과 계절 풍경을 중심으로 여유로운 여행을 즐기기 좋기 때문입니다.",
      estimatedBudget: "약 90만 원",
      samplePlan: [
        "1일차: 삿포로 시내 관광",
        "2일차: 오타루 당일치기",
        "3일차: 자연 명소 방문",
      ],
    };
  }

  if (interests.includes("food")) {
    return {
      recommendedCity: "후쿠오카",
      recommendationReason:
        "라멘, 야타이, 해산물 등 먹거리 중심 여행에 적합하기 때문입니다.",
      estimatedBudget: "약 75만 원",
      samplePlan: [
        "1일차: 하카타 도착과 라멘 거리",
        "2일차: 다자이후와 야타이 체험",
        "3일차: 쇼핑",
      ],
    };
  }

  if (interests.includes("shopping")) {
    return {
      recommendedCity: "오사카",
      recommendationReason:
        "쇼핑, 맛집, 도심 관광을 함께 즐기기 좋기 때문입니다.",
      estimatedBudget: "약 85만 원",
      samplePlan: [
        "1일차: 난바와 도톤보리",
        "2일차: 우메다 쇼핑",
        "3일차: 교토 당일치기",
      ],
    };
  }

  return {
    recommendedCity: "도쿄",
    recommendationReason:
      "처음 일본 여행을 준비하는 여행자에게 다양한 선택지가 있기 때문입니다.",
    estimatedBudget: "약 80만 원",
    samplePlan: [
      "1일차: 도쿄 도착과 시부야 관광",
      "2일차: 아사쿠사와 스카이트리",
      "3일차: 쇼핑과 맛집 탐방",
    ],
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const recommendation = createFallbackRecommendation(body.interests ?? []);

  return NextResponse.json(recommendation);
}