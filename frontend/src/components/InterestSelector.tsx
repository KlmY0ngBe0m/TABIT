type InterestSelectorProps = {
    interests: string [];
    interestLabels: Record<string, string>;
    handleInterestChange: (interest: string) => void;
};

const interestOptions = ["food", "nature", "shopping", "culture"];

export default function InterestSelector({
    interests,
    interestLabels,
    handleInterestChange,
}: InterestSelectorProps) {
    return (
    <>
        <p>관심사</p>

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
            선택한 관심사:{" "}
            {interests.map((interest) => interestLabels[interest]).join(", ")}
        </p>
    </>
    );
}