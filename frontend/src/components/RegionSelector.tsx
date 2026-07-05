
type RegionSelectorProps = {
    selectedRegion: string;
    regionLabels: Record<string, string>;
    title: string;
    description: string;
    selectedTitle: string;
    setSelectedRegion: (region: string) => void;
};

const regionOptions = [
    "undecided",
    "hokkaido",
    "tohoku",
    "kanto",
    "chubu",
    "kansai",
    "chugoku",
    "shikoku",
    "kyushu",
    "okinawa",
];

export default function RegionSelector({
    selectedRegion,
    regionLabels,
    title,
    description,
    selectedTitle,
    setSelectedRegion,
}: RegionSelectorProps) {
    return (
        <section className="region-selector">
            <p className="form-label">{title}</p>
            <p className="region-description">{description}</p>

            <div className="region-map">
                {regionOptions.map((region) => (
                    <button
                        key={region}
                        type="button"
                        className={`region-button region-${region} ${selectedRegion === region ? "selected" : ""
                            }`}
                        onClick={() => {
                            if (selectedRegion === region) {
                                setSelectedRegion("");
                            } else {
                                setSelectedRegion(region);
                            }
                        }}
                    >
                        {regionLabels[region]}
                    </button>
                ))}
            </div>

            <p className="selected-region">
                {selectedTitle}:{" "}
                <strong>{selectedRegion === "" ? "-" : regionLabels[selectedRegion]}</strong>
            </p>
        </section>
    );
} 