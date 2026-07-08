import { Language, translations } from "@/lib/translations";
import ConditionSummary from "./ConditionSummary";

type RecommendationResult = {
  recommendedCity: string;
  recommendationReason: string;
  estimatedBudget: string;
  samplePlan: string[];
};

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


type RecommendationCardProps = {
  recommendation: RecommendationResult;
  days: string;
  language: Language;
  submittedCondition: SubmittedCondition | null;
  isConditionVisible: boolean;
  setIsConditionVisible: (value: boolean) => void;
};

export default function RecommendationCard({
  recommendation,
  days,
  language,
  submittedCondition,
  isConditionVisible,
  setIsConditionVisible,
}: RecommendationCardProps) {
  const text = translations[language];
  return (
    <section className="result-card">
      <span className="result-badge">{text.resultLabel}</span>

      <div className="result-header">
        <h2>
          {text.recommendedDestination}: {recommendation.recommendedCity}
        </h2>

        {submittedCondition && (
          <div className="result-condition-area">
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
          </div>
        )}
      </div>

      <div className="result-section">
        <strong>{text.recommendationReason}</strong>
        <p>{recommendation.recommendationReason}</p>
      </div>

      <div className="result-section">
        <strong>{text.samplePlan}</strong>

        <div className="plan-list">
          {recommendation.samplePlan.slice(0, Number(days)).map((plan, index) => (
            <div className="plan-item" key={plan}>
              <span className="plan-day">
                {index + 1}
                {text.planDaySuffix}
              </span>
              <p>{plan}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}