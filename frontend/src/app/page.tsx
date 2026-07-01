"use client";

import { translations, type Language } from "@/lib/translations";
import { useState } from "react";
import RecommendationCard from "@/components/RecommendationCard";
import TravelForm from "@/components/TravelForm";
import { type RecommendationResult } from "@/lib/recommendation";

export default function Home() {
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("2");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [companion, setCompanion] = useState("solo");
  const [travelStyle, setTravelStyle] = useState("relaxed");
  const [interests, setInterests] = useState<string[]>([]);
  const [extraRequest, setExtraRequest] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("ko");
  const text = translations[language];

  function calculateTravelDays(start: string, end: string) {
    if (start === "" || end === "") {
      return "";
    }

    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    if (startTime > endTime){
      return "";
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((endTime - startTime) / oneDay) +1;

    return String(diffDays);
  }

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
    
    if (startDate === "") {
      setErrorMessage(text.startDateRequired);
      return;
    }

    if (endDate === "") {
      setErrorMessage(text.endDateRequired);
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage(text.invalidDateRange);
      return;
    }
    

    setIsLoading(true);

    const interestLabels =
      language === "ko"
        ? {
          food: "맛집",
          nature: "자연",
          shopping: "쇼핑",
          culture: "문화",
        }
        : {
          food: "グルメ",
          nature: "自然",
          shopping: "ショッピング",
          culture: "文化",
        };

    const companionLabels =
      language === "ko"
        ? {
          solo: "혼자",
          friend: "친구",
          couple: "연인",
          family: "가족",
        }
        : {
          solo: "一人",
          friend: "友達",
          couple: "カップル",
          family: "家族",
        };

    const travelStyleLabels =
      language === "ko"
        ? {
          relaxed: "여유롭게",
          balanced: "보통",
          packed: "알차게",
        }
        : {
          relaxed: "ゆったり",
          balanced: "バランスよく",
          packed: "しっかり観光",
        };

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          budget: language === "ko" ? `${budget}만 원` : `${budget}円`,
          days,
          startDate,
          endDate,
          companion: companionLabels[companion as keyof typeof companionLabels],
          travelStyle: travelStyleLabels[travelStyle as keyof typeof travelStyleLabels],
          interests: interests.map(
            (interest) => interestLabels[interest as keyof typeof interestLabels]
          ),
          extraRequest,
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
        startDate={startDate}
        endDate={endDate}
        companion={companion}
        travelStyle={travelStyle}
        interests={interests}
        extraRequest={extraRequest}
        isLoading={isLoading}
        setBudget={setBudget}
        setDays={setDays}
        setStartDate={(value) => {
          setStartDate(value);

          const calculatedDays = calculateTravelDays(value, endDate);
          if (calculatedDays !== "") {
            setDays(calculatedDays);
          }
        }}
        setEndDate={(value) => {
          setEndDate(value);

          const calculatedDays = calculateTravelDays(startDate, value);
          if (calculatedDays === "") {
            setDays(calculatedDays);
          }
        }}
        setCompanion={setCompanion}
        setTravelStyle={setTravelStyle}
        setExtraRequest={setExtraRequest}
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
