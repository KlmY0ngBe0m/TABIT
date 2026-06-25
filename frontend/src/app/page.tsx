"use client";

import { translations, type Language } from "@/lib/translations";
import { useState } from "react";
import RecommendationCard from "@/components/RecommendationCard";
import TravelForm from "@/components/TravelForm";
import {
  recommendDestination,
  type RecommendationResult,
} from "../lib/recommendation";

export default function Home() {
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("2");
  const [companion, setCompanion] = useState("solo");
  const [travelStyle, setTravelStyle] = useState("relaxed");
  const [interests, setInterests] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [language, setLanguage] = useState<Language>("ko");
  const text = translations[language];

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

      {recommendation && (
        <RecommendationCard recommendation={recommendation} days={days} />
      )}
    </main>
  );
}
