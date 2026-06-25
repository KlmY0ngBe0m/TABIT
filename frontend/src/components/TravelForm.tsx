import { ValueOf } from "next/dist/shared/lib/constants";
import InterestSelector from "./InterestSelector";

type TravelFormProps = {
    budget: string;
    days: string;
    companion: string;
    travelStyle: string;
    interests: string[];
    companionLabels: Record<string, string>;
    travelStyleLabels: Record<string, string>;
    interestLabels: Record<string, string>;
    setBudget: (value: string) => void;
    setDays: (value: string) => void;
    setCompanion: (value: string) => void;
    setTravelStyle: (vlaue: string) => void;
    handleInterestChange: (interest: string) => void;
    handleRecommendClick: () => void;
};

export default function TravelForm({
  budget,
  days,
  companion,
  travelStyle,
  interests,
  companionLabels,
  travelStyleLabels,
  interestLabels,
  setBudget,
  setDays,
  setCompanion,
  setTravelStyle,
  handleInterestChange,
  handleRecommendClick,
}: TravelFormProps) {
  return (
    <section className="travel-form">
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

     <InterestSelector
        interests={interests}
        interestLabels={interestLabels}
        handleInterestChange={handleInterestChange}
/>

      <button type="button" onClick={handleRecommendClick}>
        여행지 추천
      </button>
    </section>
  );
}