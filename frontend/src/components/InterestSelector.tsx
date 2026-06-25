type InterestSelectorProps = {
    interests: string [];
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
        <p>{title}</p>

        {interestOptions.map((interest) => (
            <label key={interest}>
                <input 
                    type="checkbox"
                    checked={interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                />
                {interestLabels[interest]}
            </label>
        ))}

        <p>
            {selectedTitle}:{" "}
            {interests.map((interest) => interestLabels[interest]).join(", ")}
        </p>
    </>
    );
}