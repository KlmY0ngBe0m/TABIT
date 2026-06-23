"use client";

import { useState } from "react";
import RecommendationCard from "@/components/RecommendationCard";
import TravelForm from "@/components/TravelForm";
import {
  recommendDestination,
  type RecommendationResult,
} from "../lib/recommendation";

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

const interestLabels: Record<string, string> = {
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

      <TravelForm
        budget={budget}
        days={days}
        companion={companion}
        travelStyle={travelStyle}
        interests={interests}
        companionLabels={companionLabels}
        travelStyleLabels={travelStyleLabels}
        interestLabels={interestLabels}
        setBudget={setBudget}
        setDays={setDays}
        setCompanion={setCompanion}
        setTravelStyle={setTravelStyle}
        handleInterestChange={handleInterestChange}
        handleRecommendClick={handleRecommendClick}
      />

      {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}

      {recommendation && (
        <RecommendationCard recommendation={recommendation} days={days} />
      )}
    </main>
  );
}
