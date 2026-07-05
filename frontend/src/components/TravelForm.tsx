import InterestSelector from "./InterestSelector";
import RegionSelector from "./RegionSelector";
import { translations } from "@/lib/translations";

type TravelFormProps = {
  language: "ko" | "ja";
  budget: string;
  days: string;
  startDate: string;
  endDate: string;
  companion: string;
  peopleCount: string;
  selectedRegion: string;
  travelStyle: string;
  interests: string[];
  isLoading: boolean;
  extraRequest: string;
  setBudget: (value: string) => void;
  setDays: (value: string) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setCompanion: (value: string) => void;
  setPeopleCount: (value: string) => void;
  setSelectedRegion: (value: string) => void;
  setTravelStyle: (value: string) => void;
  setExtraRequest: (value: string) => void;
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
  peopleCount,
  selectedRegion,
  travelStyle,
  interests,
  extraRequest,
  isLoading,
  setBudget,
  setDays,
  setStartDate,
  setEndDate,
  setCompanion,
  setPeopleCount,
  setSelectedRegion,
  setTravelStyle,
  setExtraRequest,
  handleInterestChange,
  handleRecommendClick,
}: TravelFormProps) {

  const text = translations[language];

  return (
    <section className="travel-form">
      <div className="form-section">
        <h2>1. 기본 여행 정보</h2>

        <div className="form-grid">
          <div className="form-field">
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
          </div>

          <div className="form-field">
            <label htmlFor="people-count">{text.peopleCount}</label>
            <input
              id="people-count"
              type="number"
              min="1"
              max="20"
              value={peopleCount}
              onChange={(event) => setPeopleCount(event.target.value)}
              placeholder={text.peopleCountPlaceholder}
            />
          </div>

          <div className="form-field">
            <label htmlFor="start-date">
              {language === "ko" ? "출발일" : "出発日"}
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="end-date">
              {language === "ko" ? "귀국일" : "帰国日"}
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </div>

        <div className="readonly-field">
          <span>{text.days}</span>
          <strong>
            {days}
            {text.dayUnit}
          </strong>
        </div>
      </div>

      <div className="form-section">
        <h2>2. 여행 취향 선택</h2>

        <RegionSelector
          selectedRegion={selectedRegion}
          regionLabels={text.regionLabels}
          title={text.region}
          description={text.regionDescription}
          selectedTitle={text.selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />

        <div className={Number(peopleCount) >= 2 ? "form-grid" : "single-field"}>
          <div className="form-field">
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
          </div>

          {Number(peopleCount) >= 2 && (
            <div className="form-field">
              <label htmlFor="companion">{text.companion}</label>
              <select
                id="companion"
                value={companion}
                onChange={(event) => setCompanion(event.target.value)}
              >
                <option value="friend">{text.companionLabels.friend}</option>
                <option value="couple">{text.companionLabels.couple}</option>
                <option value="family">{text.companionLabels.family}</option>
              </select>
            </div>
          )}
        </div>


        <InterestSelector
          interests={interests}
          interestLabels={text.interestLabels}
          handleInterestChange={handleInterestChange}
          title={text.interests}
          selectedTitle={text.selectedInterests}
        />
      </div>

      <div className="form-section">
        <h2>3. 추가 요청</h2>

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
      </div>
    </section>
  );
}
