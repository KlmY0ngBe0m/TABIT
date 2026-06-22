type RecommendationResult = {
    recommendedCity: string;
    recommendationReason: string;
    estimatedBudget: string;
    samplePlan: string[];
};

type RecommendationCardProps = {
    recommendation: RecommendationResult;
    days: string;
};

export default function RecommendationCard({
  recommendation,
  days,
}: RecommendationCardProps) {
  return (
    <section className="result-card">
      <h2>추천 여행지: {recommendation.recommendedCity}</h2>
      <p>추천 이유: {recommendation.recommendationReason}</p>
      <p>예상 예산: {recommendation.estimatedBudget}</p>

      <h3>간단 일정</h3>
      <ul>
        {recommendation.samplePlan.slice(0, Number(days)).map((plan) => (
          <li key={plan}>{plan}</li>
        ))}
      </ul>
    </section>
  );
}