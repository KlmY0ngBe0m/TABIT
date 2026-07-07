"use client";

import { translations, type Language } from "@/lib/translations";
import { useState } from "react";
import RecommendationCard from "@/components/RecommendationCard";
import TravelForm from "@/components/TravelForm";
import { type RecommendationResult } from "@/lib/recommendation";
import ConditionSummary from "@/components/ConditionSummary";

type SubmittedCondition = {
  budget: string;
  days: string;
  startDate: string;
  endDate: string;
  peopleCount: string;
  selectedRegion: string;
  companion: string;
  travelStyle: string;
  interests: string[];
  extraRequest: string;
};

function formatDate(date: Date)  {
  return date.toISOString().slice(0,10);
}

function getTommorrowDate() {
  const tommorrow = new Date();
  tommorrow.setDate(tommorrow.getDate() +1);
  return formatDate(tommorrow);
}

export default function Home() {
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("2");
  const [startDate, setStartDate] = useState(formatDate(new Date ()));
  const [endDate, setEndDate] = useState(getTommorrowDate());
  const [peopleCount, setPeopleCount] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [companion, setCompanion] = useState("friend");
  const [travelStyle, setTravelStyle] = useState("relaxed");
  const [interests, setInterests] = useState<string[]>([]);
  const [extraRequest, setExtraRequest] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [submittedCondition, setSubmittedCondition] = useState<SubmittedCondition | null>(null);
  const [isConditionVisible, setIsConditionVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("ko");
  const text = translations[language];

  function calculateTravelDays(start: string, end: string) {
    if (start === "" || end === "") {
      return "";
    }

    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    if (startTime > endTime) {
      return "";
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((endTime - startTime) / oneDay) + 1;

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
    setSubmittedCondition(null);
    setIsConditionVisible(false);
    const minimumBudget = language === "ko" ? 30 : 30000;

    if (budget === "") {
      setErrorMessage(text.budgetRequired);
      return;
    }

    if (Number(budget) < minimumBudget) {
      setErrorMessage(text.budgetMinimum);
      return;
    }

    if (peopleCount === "") {
      setErrorMessage(text.peopleCountRequired);
      return;
    }

    if (Number(peopleCount) < 1) {
      setErrorMessage(text.peopleCountMinimum);
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


    if (selectedRegion === "") {
      setErrorMessage(text.regionRequired);
      return;
    }


    if (interests.length === 0) {
      setErrorMessage(text.interestRequired);
      return;
    }

    const selectedRegionLabel =
      text.regionLabels[selectedRegion as keyof typeof text.regionLabels];

    const confirmMessage = [
      `${text.confirmTitle}`,
      "",
      `${text.confirmBudget}: ${budget}${text.budgetUnit}`,
      `${text.confirmDays}: ${days}${text.dayUnit}`,
      `${text.confirmStartDate}: ${startDate}`,
      `${text.confirmEndDate}: ${endDate}`,
      `${text.confirmPeopleCount}: ${peopleCount}${text.personUnit}`,
      `${text.confirmRegion}: ${selectedRegionLabel}`,
      `${text.confirmCompanion}: ${Number(peopleCount) === 1
        ? text.soloLabel
        : text.companionLabels[companion as keyof typeof text.companionLabels]
      }`,
      `${text.confirmTravelStyle}: ${text.travelStyleLabels[travelStyle as keyof typeof text.travelStyleLabels]
      }`,
      `${text.confirmInterests}: ${interests
        .map(
          (interest) =>
            text.interestLabels[interest as keyof typeof text.interestLabels]
        ).join(", ")}`,
      extraRequest !== "" ? `${text.confirmExtraRequest}: ${extraRequest}` : "",
    ].join("\n");

    const isConfirmed = window.confirm(confirmMessage);

    if (!isConfirmed) {
      return;
    }

    setSubmittedCondition({
      budget: `${budget}${text.budgetUnit}`,
      days,
      startDate,
      endDate,
      peopleCount: `${peopleCount}${text.personUnit}`,
      selectedRegion: selectedRegionLabel,
      companion:
        Number(peopleCount) === 1
          ? text.soloLabel
          : text.companionLabels[companion as keyof typeof text.companionLabels],
      travelStyle: text.travelStyleLabels[
        travelStyle as keyof typeof text.travelStyleLabels
      ],
      interests: interests.map(
        (interest) => text.interestLabels[interest as keyof typeof text.interestLabels]
      ),
      extraRequest,
    });

    setIsLoading(true);

    const interestLabels = text.interestLabels;
    const companionLabels = text.companionLabels;
    const travelStyleLabels = text.travelStyleLabels;

    const companionForRequest =
      Number(peopleCount) === 1
        ? text.soloLabel
        : companionLabels[companion as keyof typeof companionLabels];

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          budget: `${budget}${text.budgetUnit}`,
          days,
          startDate,
          endDate,
          peopleCount: `${peopleCount}${text.personUnit}`,
          selectedRegion: selectedRegionLabel,
          companion: companionForRequest,
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
      <header className="hero">
        <button
          type="button"
          className="language-toggle"
          onClick={() => setLanguage(language === "ko" ? "ja" : "ko")}
        >
          {language === "ko" ? "日本語" : "한국어"}
        </button>

        <h1>TABIT</h1>
        <p>{text.description}</p>
      </header>

      <TravelForm
        language={language}
        budget={budget}
        today={formatDate(new Date())}
        days={days}
        startDate={startDate}
        endDate={endDate}
        peopleCount={peopleCount}
        selectedRegion={selectedRegion}
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
          if (calculatedDays !== "") {
            setDays(calculatedDays);
          }
        }}
        setCompanion={setCompanion}
        setPeopleCount={setPeopleCount}
        setSelectedRegion={setSelectedRegion}
        setTravelStyle={setTravelStyle}
        setExtraRequest={setExtraRequest}
        handleInterestChange={handleInterestChange}
        handleRecommendClick={handleRecommendClick}
      />

      {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}

      {submittedCondition && (
        <>
          <button
            type="button"
            className="condition-toggle-button"
            onClick={() => setIsConditionVisible(!isConditionVisible)}
          >
            {isConditionVisible
              ? text.hideSelectedCondition
              : text.showSelectedCondition}
          </button>

          {isConditionVisible && (
            <ConditionSummary
              condition={submittedCondition}
              language={language}
            />
          )}
        </>
      )}

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
