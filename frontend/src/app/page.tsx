"use client";

import { useState } from "react";

type Destination = {
  city: string;
  keyword: string;
  reason: string;
  estimatedBudget: string;
  samplePlan: string[];
};

type RecommendationResult = {
  recommendedCity: string;
  recommendationReason: string;
  estimatedBudget: string;
  samplePlan: string[];
};

const destinations: Destination[] = [
  {
    city: "삿포로",
    keyword: "nature",
    reason: "자연, 계절 풍경, 여유로운 여행을 즐기기에 좋기 때문입니다.",
    estimatedBudget: "약 90만 원",
    samplePlan: [
      "1일차: 삿포로 시내 관광",
      "2일차: 오타루 당일치기",
      "3일차: 자연 명소 방문",
    ],
  },
  {
    city: "후쿠오카",
    keyword: "food",
    reason: "라멘, 야타이, 해산물 등 먹거리 중심 여행에 적합하기 때문입니다.",
    estimatedBudget: "약 75만 원",
    samplePlan: [
      "1일차: 하카타 도착과 라멘 거리",
      "2일차: 다자이후와 야타이 체험",
      "3일차: 쇼핑",
    ],
  },
  {
    city: "오사카",
    keyword: "shopping",
    reason: "쇼핑, 맛집, 도심 관광을 함께 즐기기 좋기 때문입니다.",
    estimatedBudget: "약 85만 원",
    samplePlan: [
      "1일차: 난바와 도톤보리",
      "2일차: 우메다 쇼핑",
      "3일차: 교토 당일치기",
    ],
  },
];
function recommendDestination(interests: string[]): RecommendationResult {
  const matchedDestination = destinations.find((destination) =>
    interests.includes(destination.keyword)
  );
  
  if (matchedDestination) {
    return {
      recommendedCity: matchedDestination.city,
      recommendationReason: matchedDestination.reason,
      estimatedBudget: matchedDestination.estimatedBudget,
      samplePlan: matchedDestination.samplePlan,
    };
  }

  return {
    recommendedCity: "도쿄",
    recommendationReason: "처음 일본 여행을 준비하는 여행자에게 다양한 선택지가 있기 때문입니다.",
    estimatedBudget: "약 80만 원",
    samplePlan: [
      "1일차: 도쿄 도착과 시부야 관광",
      "2일차: 아사쿠사와 스카이트리",
      "3일차: 쇼핑과 맛집 탐방",
    ],
  };
}

const companionLabels: Record<string, string> = {
  solo: "혼자",
  friend: "친구",
  couple: "연인",
  family: "가족",
};

const travelStyleLabels: Record<string, string> = {
  relaxed: "여유롭게",
  balanced: "보통",
  packed: "알차게",
};

const interestsLabels: Record<string, string> = {
  food: "맛집",
  nature: "자연",
  shopping: "쇼핑",
  culture: "문화",
};

export default function Home() {
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("2");
  const [companion, setCompanion] = useState("solo");
  const [travelStyle, setTravelStyle] = useState("relaxed");
  const [interests, setInterests] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);

  function handleInterestChange(interest: string) {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  }
  function handleRecommendClick() {
    setErrorMessage("");
    setRecommendation(null);

    if (budget === "") {
      setErrorMessage("예산을 입력해 주세요.");
      return;
    }
    if (Number(budget) < 30) {
      setErrorMessage("예산은 최소 30만 원 이상으로 입력해주세요.");
      return;
    }
    if (interests.length === 0) {
      setErrorMessage("관심사를 하나 이상 선택해주세요.");
      return;
    }

    const result = recommendDestination(interests);
    setRecommendation(result);
  }

  return (
    <main>
      <h1>TABIT</h1>
      <p>나에게 맞는 일본 여행지를 찾아보세요.</p>

      <label htmlFor="budget">예산(만원)</label>
      <input 
        id="budget"
        type="number" 
        placeholder="예: 100" 
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
        />

      <label htmlFor="days">여행 기간</label>
      <select 
        id="days"
        value={days}
        onChange={(event) => setDays(event.target.value)}
        >
        <option value="2">2일</option>
        <option value="3">3일</option>
        <option value="4">4일</option>
      </select>

      <p>입력한 예산: {budget}만 원</p>
      <p>선택한 여행 기간: {days}일</p>

      <label htmlFor="companion">동행 유형</label>
      <select
        id="companion"
        value={companion}
        onChange={(event) => setCompanion(event.target.value)}
      >
        <option value="solo">혼자</option>
        <option value="friend">친구</option>
        <option value="couple">연인</option>
        <option value="family">가족</option>
      </select>

    <label htmlFor="travel-style">여행 스타일</label>
    <select
      id="travel-style"
      value={travelStyle}
      onChange={(event) => setTravelStyle(event.target.value)}
    >
      <option value="relaxed">여유롭게</option>
      <option value="balanced">보통</option>
      <option value="packed">알차게</option>
    </select>

    <p>동행 유형: {companionLabels[companion]}</p>
    <p>여행 스타일: {travelStyleLabels[travelStyle]}</p>

    <p>관심사</p>

    <label>
      <input 
        type="checkbox"
        checked={interests.includes("food")}
        onChange={() => handleInterestChange("food")} 
      />
      맛집
    </label>

    <label>
      <input 
        type="checkbox"
        checked={interests.includes("nature")}
        onChange={() => handleInterestChange("nature")} 
      />
      자연
    </label>

    <label>
      <input 
        type="checkbox"
        checked={interests.includes("shopping")}
        onChange={() => handleInterestChange("shopping")} 
      />
      쇼핑
    </label>

    <label>
      <input 
        type="checkbox"
        checked={interests.includes("culture")}
        onChange={() => handleInterestChange("culture")} 
      />
      문화 
    </label>

    <p>선택한 관심사:{" "} 
      {interests.map((interest) => interestsLabels[interest]).join(", ")}</p>
      <button type="button" onClick={handleRecommendClick}>여행지 추천</button>
      {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}

      {recommendation && (
        <section className="result-card">
          <h2>추천 여행지: {recommendation.recommendedCity}</h2>
          <p>추천 이유: {recommendation.recommendationReason}</p>
          <p>예상 예산: {recommendation.estimatedBudget}</p>

          <h3>간단 일정</h3>
          <ul>
            {recommendation.samplePlan.slice(0, Number(days)).map((plan) => 
            (<li key={plan}>{plan}</li>
          ))}
          </ul>
        </section>
      )}
    </main>
  );
}