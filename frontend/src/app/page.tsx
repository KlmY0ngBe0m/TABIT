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
  const [language, setLanguage] = useState<"ko" | "ja">("ko");

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
    const minimumBudget = language === "ko" ? 30 : 30000;

    if (budget === "") {
      setErrorMessage(
        language === "ko" ? "예산을 입력해 주세요." : "予算を入力してください。"
      );
      return;
    }
    if (Number(budget) < minimumBudget) {
      setErrorMessage(
        language === "ko" ? "예산은 최소 30만 원 이상으로 입력해주세요." : "予算は3万円以上で入力してください。"
      );
      return;
    }
    if (interests.length === 0) {
      setErrorMessage(
        language === "ko" ? "관심사를 하나 이상 선택해주세요." : "興味のある項目を1つ以上選択してください。"
      );
      return;
    }

    const result = recommendDestination(interests);
    setRecommendation(result);
  }

  return (
    <main>
      <button 
        type="button"
        onClick={() => setLanguage(language === "ko" ? "ja" : "ko")}
      >
        {language === "ko" ? "日本語" : "한국어"}
      </button>
      <h1>TABIT</h1>
      <p>
        {language === "ko"
        ? "나에게 맞는 일본 여행지를 찾아보세요."
        : "あなたにぴったりの日本旅行先を見つけましょう。"}
      </p>

      <TravelForm
        language={language}
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
