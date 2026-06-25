import InterestSelector from "./InterestSelector";
import { translations } from "@/lib/translations";

type TravelFormProps = {
  language: "ko" | "ja";
  budget: string;
  days: string;
  companion: string;
  travelStyle: string;
  interests: string[];
  setBudget: (value: string) => void;
  setDays: (value: string) => void;
  setCompanion: (value: string) => void;
  setTravelStyle: (value: string) => void;
  handleInterestChange: (interest: string) => void;
  handleRecommendClick: () => void;
};

export default function TravelForm({
  language,
  budget,
  days,
  companion,
  travelStyle,
  interests,
  setBudget,
  setDays,
  setCompanion,
  setTravelStyle,
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

      <label htmlFor="days">{text.days}</label>
      <select
        id="days"
        value={days}
        onChange={(event) => setDays(event.target.value)}
      >
        <option value="2">2{text.dayUnit}</option>
        <option value="3">3{text.dayUnit}</option>
        <option value="4">4{text.dayUnit}</option>
      </select>

      <p>
        {text.enteredBudget}: {budget}
        {text.budgetUnit}
      </p>

      <p>
        {text.selectedDays} : {days}
        {text.dayUnit}
      </p>

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

      <button type="button" onClick={handleRecommendClick}>
        {text.recommendButton}
      </button>
    </section>
  );
}
