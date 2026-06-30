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
      <h2>
        {text.recommendedDestination}: {recommendation.recommendedCity}
      </h2>

      <div className="result-setion">
        <strong>{text.recommendationReason}</strong>
        <p>{recommendation.recommendationReason}</p>
      </div>

      <div className="result-section">
        <strong>{text.estimatedBudget}</strong>
        <p>{recommendation.estimatedBudget}</p>
      </div>

      <div className="result-section">
      <h3>{text.samplePlan}</h3>
      </div>
      <ul>
        {recommendation.samplePlan.slice(0, Number(days)).map((plan) => (
          <li key={plan}>{plan}</li>
        ))}
      </ul>
    </section>
  );
}