import { headers } from "next/headers";
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

const regionCityMap: Record<string, string[]> = {
  홋카이도: ["삿포로", "하코다테", "오타루", "후라노", "비에이", "아사히카와"],
  도호쿠: ["센다이", "아오모리", "아키타", "야마가타", "모리오카", "후쿠시마"],
  간토: ["도쿄", "요코하마", "가마쿠라", "하코네", "닛코", "치바"],
  주부: ["나고야", "가나자와", "다카야마", "나가노", "시즈오카", "니가타"],
  간사이: ["오사카", "교토", "고베", "나라", "와카야마", "히메지"],
  주고쿠: ["히로시마", "오카야마", "마쓰에", "돗토리", "야마구치"],
  시코쿠: ["마쓰야마", "다카마쓰", "고치", "도쿠시마"],
  규슈: ["후쿠오카", "나가사키", "구마모토", "가고시마", "벳푸", "유후인", "미야자키"],
  오키나와: ["나하", "이시가키", "미야코지마", "온나", "나고"],
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const body = await request.json();
  const regionCandidateCities = regionCityMap[body.selectedRegion] ?? [];

  if (!apiKey) {
    const recommendation = createFallbackRecommendation(body.interests ?? []);
    return NextResponse.json(recommendation);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5.5",
        reasoning: { effort: "low" },
        input: `
            다음 조건에 맞는 일본 여행지를 추천해줘. 반드시 JSON 형식만 반환해줘.
            
            조건:
           - 예산: ${body.budget}
           - 예산 단위는 입련된 그대로 사용하고, 다른 통화로 변환하지 마세요.
           - 여행 기간: ${body.days}일
           - 출발일: ${body.startDate || "미정"}
           - 귀국일: ${body.endDate || "미정"}
           - 인원수: ${body.peopleCount}
           - 선택 지역: ${body.selectedRegion}
           - 선택 지역의 대표 후보 도시: ${regionCandidateCities.join(", ")}
           - 동행 유형: ${body.companion}
           - 여행 스타일: ${body.travelStyle}
           - 관심사: ${(body.interests ?? [])
            .map((interest: string) => body.interestLabels?.[interest] ?? interest)
            .join(", ")}
           - 언어: ${body.language}
           - 추가요청: ${body.extraRequest || "없음"}
           - samplePlan에는 "1일차:", "2일차:" 같은 날짜 번호를 넣지 말고 일정 내용만 작성해줘.

           규칙:
           - 선택 지역이 "아직 정하지 않음" 또는 "まだ決めていない"이면 일본 전체에서 조건에 맞는 여행지를 추천해줘.
           - 그 외 지역이 선택되어 있으면 반드시 해당 지역 안에서 여행지를 추천해줘.
           - 대표 후보 도시는 참고용이며, 같은 지역 안의 다른 소도시를 추천해도 됩니다.
           - 단, 선택 지역 밖의 도시는 추천하지 마세요.

            반환 형식:  
            {
              "recommendedCity": "도시명",
              "recommendationReason": "추천 이유",
              "estimatedBudget": "예상 예산",
              "samplePlan": [
              "1일차: 하루 일정 내용만 작성 '1일차:' 같은 날짜 표시는 쓰지 않음",
              "2일차: 하루 일정 내용만 작성 '2일차:' 같은 날짜 표시는 쓰지 않음",
              ]
            }
                    `,


      }),
    })

    if (!response.ok) {
      throw new Error("OpenAI API request failed");
    }

    const data = await response.json();
    const aiText =
      data.output_text ??
      data.output
        ?.flatMap((item: any) => item.content ?? [])
        ?.find((content: any) => content.type === "output_text")
        ?.text;

    if (!aiText) {
      console.error("OpenAI raw resonse", JSON.stringify(data, null, 2));
      throw new Error("AI response text is empty");
    }

    const recommendation = JSON.parse(aiText);

    const allowedCities = regionCityMap[body.selectedRegion];

    if (
      allowedCities &&
      !allowedCities.some((city) => recommendation.recommendedCity.includes(city))
    ) {
      throw new Error("Recommended city is outside selected region");
    }

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("OpenAI error", error);

    const recommendation = createFallbackRecommendation(body.interests ?? []);
    return NextResponse.json(recommendation);
  }
}