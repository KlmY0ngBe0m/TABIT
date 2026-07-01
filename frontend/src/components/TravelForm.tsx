import InterestSelector from "./InterestSelector";
import { translations } from "@/lib/translations";

type TravelFormProps = {
  language: "ko" | "ja";
  budget: string;
  days: string;
  startDate: string;
  endDate: string;
  companion: string;
  travelStyle: string;
  interests: string[];
  isLoading: boolean;
  extraRequest: string;
  setBudget: (value: string) => void;
  setDays: (value: string) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setCompanion: (value: string) => void;
  setTravelStyle: (value: string) => void;
  setExtraRequest: (vlaue: string) => void;
  handleInterestChange: (interest: string) => void;
  handleRecommendClick: () => void;
};

export default function TravelForm({
  language,
  budget,
  days,
  startDate,
  endDate,
  companion,
  travelStyle,
  interests,
  extraRequest,
  isLoading,
  setBudget,
  setDays,
  setStartDate,
  setEndDate,
  setCompanion,
  setTravelStyle,
  setExtraRequest,
  handleInterestChange,
  handleRecommendClick,
}: TravelFormProps) {

  const text = translations[language];

  return (
    <section className="travel-form">
      <label htmlFor="budget">
        {text.budget}
      </label>
      <input
        id="budget"
        type="number"
        placeholder={text.budgetPlaceholder}
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
      />

      <label htmlFor="start-date">
        {language === "ko" ? "출발일" : "出発日"}
      </label>
      <input
        id="start-date"
        type="date"
        value={startDate}
        onChange={(event) => setStartDate(event.target.value)}
      />

      <label htmlFor="end-date">
        {language === "ko" ? "귀국일" : "帰国日"}
      </label>
      <input
        id="end-date"
        type="date"
        value={endDate}
        onChange={(event) => setEndDate(event.target.value)}
      />

      <div className="readonly-field">
        <span>{text.days}</span>
        <strong>
          {days}
          {text.dayUnit}
        </strong>
      </div>

      <label htmlFor="companion">{text.companion}</label>
      <select
        id="companion"
        value={companion}
        onChange={(event) => setCompanion(event.target.value)}
      >
        <option value="solo">{text.companionLabels.solo}</option>
        <option value="friend">{text.companionLabels.friend}</option>
        <option value="couple">{text.companionLabels.couple}</option>
        <option value="family">{text.companionLabels.family}</option>
      </select>

      <label htmlFor="travel-style">{text.travelStyle}</label>
      <select
        id="travel-style"
        value={travelStyle}
        onChange={(event) => setTravelStyle(event.target.value)}
      >
        <option value="relaxed">{text.travelStyleLabels.relaxed}</option>
        <option value="balanced">{text.travelStyleLabels.balanced}</option>
        <option value="packed">{text.travelStyleLabels.packed}</option>
      </select>

      <p>
        {text.selectedCompanion}: {text.companionLabels[companion as keyof typeof text.companionLabels]}
      </p>
      <p>
        {text.selectedTravelStyle}: {text.travelStyleLabels[travelStyle as keyof typeof text.travelStyleLabels]}
      </p>

      <InterestSelector
        interests={interests}
        interestLabels={text.interestLabels}
        handleInterestChange={handleInterestChange}
        title={text.interests}
        selectedTitle={text.selectedInterests}
      />

      <label htmlFor="extra-request">
        {language === "ko" ? "추가 요청" : "追加リクエスト"}
      </label>

      <textarea
        id="extra-request"
        value={extraRequest}
        maxLength={100}
        onChange={(event) => {
          setExtraRequest(event.target.value);

          const textarea = event.target;
          const lineHeight = 24;
          const minHeight = 44;
          const maxHeight = 140;

          textarea.style.height = "auto";

          const nextHeight = Math.min(
            Math.max(textarea.scrollHeight, minHeight),
            maxHeight
          );

          const steppedHeight = Math.ceil(nextHeight / lineHeight) * lineHeight;

          textarea.style.height = `${steppedHeight}px`;
        }}

        placeholder={
          language === "ko"
            ? "예: 조용한 온천 지역이면 좋겠어요."
            : "例: 静かな温泉地に行きたいです。"
        }
      />

      <p className="character-count"> 
        {extraRequest.length}/100
      </p>

      <button type="button" onClick={handleRecommendClick} disabled={isLoading}>
        {isLoading
          ? language === "ko"
            ? "추천 생성 중..."
            : "おすすめ作成中..."
          : text.recommendButton}
      </button>
    </section>
  );
}
