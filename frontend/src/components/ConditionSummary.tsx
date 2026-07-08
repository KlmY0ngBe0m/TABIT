import { translations, type Language } from "@/lib/translations";

type SubmittedCondition = {
    budget: string;
    days: string;
    startDate: string;
    endDate: string;
    peopleCount: string;
    selectedRegion:string;
    companion: string;
    travelStyle: string;
    interests: string[];
    extraRequest: string;
};

type ConditionSummaryProps = {
    condition: SubmittedCondition;
    language: Language;
};

export default function ConditionSummary({
    condition,
    language,
}: ConditionSummaryProps) {
    const text = translations[language];

    return (
        <section className="condition-summary">
            <h2>{text.selectedTravelCondition}</h2>

            <dl>
                <div>
                    <dt>{text.confirmBudget}</dt>
                    <dd>{condition.budget}</dd>
                </div>

                <div>
                    <dt>{text.confirmDays}</dt>
                    <dd>{condition.days}{text.dayUnit}</dd>
                </div>

                <div>
                    <dt>{text.confirmStartDate}</dt>
                    <dd>{condition.startDate}</dd>
                </div>

                <div>
                    <dt>{text.confirmEndDate}</dt>
                    <dd>{condition.endDate}</dd>
                </div>

                <div>
                    <dt>{text.confirmPeopleCount}</dt>
                    <dd>{condition.peopleCount}</dd>
                </div>

                <div>
                    <dt>{text.confirmRegion}</dt>
                    <dd>{condition.selectedRegion}</dd>
                </div>

                <div>
                    <dt>{text.confirmCompanion}</dt>
                    <dd>{condition.companion}</dd>
                </div>

                <div>
                    <dt>{text.confirmTravelStyle}</dt>
                    <dd>{condition.travelStyle}</dd>
                </div>

                <div>
                    <dt>{text.confirmInterests}</dt>
                    <dd>{condition.interests.join(", ")}</dd>
                </div>

                {condition.extraRequest !== "" && (
                    <div>
                        <dt>{text.confirmExtraRequest}</dt>
                        <dd>{condition.extraRequest}</dd>
                    </div>
                )}
            </dl>
        </section>
    );
}