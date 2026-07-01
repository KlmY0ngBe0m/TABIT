type InterestSelectorProps = {
    interests: string[];
    interestLabels: Record<string, string>;
    handleInterestChange: (interest: string) => void;
    title: string;
    selectedTitle: string;
};

const interestOptions = ["food", "nature", "shopping", "culture"];

export default function InterestSelector({
    interests,
    interestLabels,
    handleInterestChange,
    title,
    selectedTitle,
}: InterestSelectorProps) {
    return (
        <>
            <label>{title}</label>

            <div className="interest-options">
                {interestOptions.map((interest) => (
                    <label key={interest} className="">
                        <input
                            type="checkbox"
                            checked={interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                        />
                        {interestLabels[interest]}
                    </label>
                ))}
            </div>
            <p>
                {selectedTitle}:{" "}
                {interests.map((interest) => interestLabels[interest]).join(", ")}
            </p>
        </>
    );
}