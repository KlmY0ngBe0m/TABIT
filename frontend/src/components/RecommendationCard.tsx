import { Language, translations } from "@/lib/translations";

type RecommendationResult = {
  recommendedCity: string;
  recommendationReason: string;
  estimatedBudget: string;
  samplePlan: string[];
};

type RecommendationCardProps = {
  recommendation: RecommendationResult;
  days: string;
  language: Language;
};

export default function RecommendationCard({
  recommendation,
  days,
  language,
}: RecommendationCardProps) {
  const text = translations[language];
  return (
    <section className="result-card">
      <p className="result-label">{text.resultLabel}</p>

      <h2>
        {text.recommendedDestination}: {recommendation.recommendedCity}
      </h2>

      <div className="result-section">
        <strong>{text.recommendationReason}</strong>
        <p>{recommendation.recommendationReason}</p>
      </div>

      <div className="result-section">
        <strong>{text.estimatedBudget}</strong>
        <p>{recommendation.estimatedBudget}</p>
      </div>

      <div className="result-section">
        <strong>{text.samplePlan}</strong>
        <ul className="plan-list">
          {recommendation.samplePlan.slice(0, Number(days)).map((plan, index) => (
            <li key={plan}>
              <span>
                {index + 1}
                {text.planDaySuffix}
              </span>
              <p>{plan}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}