"use client";

import { translations, type Language } from "@/lib/translations";
import { useState } from "react";
import RecommendationCard from "@/components/RecommendationCard";
import TravelForm from "@/components/TravelForm";
import { type RecommendationResult } from "@/lib/recommendation";

export default function Home() {
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("2");
  const [companion, setCompanion] = useState("solo");
  const [travelStyle, setTravelStyle] = useState("relaxed");
  const [interests, setInterests] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("ko");
  const text = translations[language];

  function handleInterestChange(interest: string) {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  }
  async function handleRecommendClick() {
    setErrorMessage("");
    setRecommendation(null);
    const minimumBudget = language === "ko" ? 30 : 30000;

    if (budget === "") {
      setErrorMessage(text.budgetRequired);
      return;
    }
    if (Number(budget) < minimumBudget) {
      setErrorMessage(text.budgetMinimum);
      return;
    }
    if (interests.length === 0) {
      setErrorMessage(text.interestRequired);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget,
          days,
          companion,
          travelStyle,
          interests,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();
      setRecommendation(result);
    } catch {
      setErrorMessage(
        language === "ko"
          ? "추천을 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
          : "おすすめ情報を取得できませんでした。しばらくしてからもう一度お試しください。"
      );
    } finally {
      setIsLoading(false);
    }
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

      <p>{text.description}</p>

      <TravelForm
        language={language}
        budget={budget}
        days={days}
        companion={companion}
        travelStyle={travelStyle}
        interests={interests}
        setBudget={setBudget}
        setDays={setDays}
        setCompanion={setCompanion}
        setTravelStyle={setTravelStyle}
        handleInterestChange={handleInterestChange}
        handleRecommendClick={handleRecommendClick}
      />

      {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}

      {isLoading && (
        <p>
          {language === "ko" 
          ? "추천을 생성하는 중입니다..."
          : "おすすめを作成しています..."}
        </p>
      )}

      {recommendation && (
        <RecommendationCard
          recommendation={recommendation}
          days={days}
          language={language}
        />
      )}
    </main>
  );
}
