import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon/";

const typeIcons = {
    normal: "◯",
    fire: "🔥",
    water: "💧",
    electric: "⚡",
    grass: "🌿",
    ice: "❄️",
    fighting: "🥊",
    poison: "☠️",
    ground: "⛰️",
    flying: "🪽",
    psychic: "🔮",
    bug: "🐛",
    rock: "🪨",
    ghost: "👻",
    dragon: "🐉",
    dark: "🌑",
    steel: "⚙️",
    fairy: "✨",
};

const statLabels = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
};

const formatLabel = (value) =>
    value
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const PokemonDetail = () => {
    const [pokemonData, setPokemonData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { pokemonNumber } = useParams();

    const loadPokemonData = async () => {
        setIsLoading(true);
        setError("");

        try {
            const resp = await fetch(apiBaseUrl + pokemonNumber);

            if (!resp.ok) {
                throw new Error("Pokemon not found");
            }

            const data = await resp.json();
            setPokemonData(data);
        } catch (err) {
            console.log(err);
            setError("We could not load this Pokémon right now.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadPokemonData();
    }, [pokemonNumber]);

    const types = pokemonData.types ?? [];
    const abilities = pokemonData.abilities ?? [];
    const stats = pokemonData.stats ?? [];
    const totalStats = useMemo(
        () => stats.reduce((sum, stat) => sum + (stat.base_stat ?? 0), 0),
        [stats]
    );
    const sprite =
        pokemonData.sprites?.other?.["official-artwork"]?.front_default ??
        pokemonData.sprites?.front_default;

    return <>
        <div className="pokemon-detail-page">
            <div className="pokemon-detail-shell">
                {isLoading && <div className="pokemon-detail-status">Loading Pokémon data...</div>}

                {error && <div className="pokemon-detail-status pokemon-detail-status-error">{error}</div>}

                {!isLoading && !error && pokemonData.id && (
                    <>
                        <section className="pokemon-hero-card">
                            <div className="pokemon-hero-copy">
                                <p className="pokemon-eyebrow">Pokédex #{String(pokemonData.id).padStart(3, "0")}</p>
                                <h1>{formatLabel(pokemonData.name ?? pokemonNumber)}</h1>
                                <p className="pokemon-subtitle">
                                    {types.length > 0
                                        ? `${formatLabel(pokemonData.name ?? pokemonNumber)} is a ${types
                                              .map((typeEntry) => formatLabel(typeEntry.type.name))
                                              .join(" / ")} Pokémon.`
                                        : "A Pokémon profile with its core stats and traits."}
                                </p>

                                <div className="pokemon-type-list" aria-label="Pokemon types">
                                    {types.map((typeEntry) => {
                                        const typeName = typeEntry.type.name;

                                        return (
                                            <span key={typeName} className={`pokemon-type-badge type-${typeName}`}>
                                                <span aria-hidden="true">{typeIcons[typeName] ?? "◼"}</span>
                                                {formatLabel(typeName)}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="pokemon-sprite-panel">
                                {sprite ? (
                                    <img src={sprite} alt={pokemonData.name} className="pokemon-sprite" />
                                ) : (
                                    <div className="pokemon-sprite pokemon-sprite-placeholder">No image available</div>
                                )}
                            </div>
                        </section>

                        <section className="pokemon-info-grid">
                            <article className="pokemon-info-card">
                                <p className="pokemon-card-label">Core data</p>
                                <div className="pokemon-metric-list">
                                    <div className="pokemon-metric"><span>🎯 Base experience</span><strong>{pokemonData.base_experience ?? "-"}</strong></div>
                                    <div className="pokemon-metric"><span>📏 Height</span><strong>{pokemonData.height != null ? `${(pokemonData.height / 10).toFixed(1)} m` : "-"}</strong></div>
                                    <div className="pokemon-metric"><span>⚖️ Weight</span><strong>{pokemonData.weight != null ? `${(pokemonData.weight / 10).toFixed(1)} kg` : "-"}</strong></div>
                                    <div className="pokemon-metric"><span>🔁 Order</span><strong>{pokemonData.order ?? "-"}</strong></div>
                                </div>
                            </article>

                            <article className="pokemon-info-card">
                                <p className="pokemon-card-label">Abilities</p>
                                <div className="pokemon-tag-list">
                                    {abilities.map((abilityEntry) => (
                                        <span key={abilityEntry.ability.name} className={`pokemon-ability-tag ${abilityEntry.is_hidden ? "is-hidden" : ""}`}>
                                            {formatLabel(abilityEntry.ability.name)}
                                            {abilityEntry.is_hidden ? " (hidden)" : ""}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </section>

                        <section className="pokemon-info-card pokemon-stats-card">
                            <p className="pokemon-card-label">Base stats</p>
                            <div className="pokemon-stats-summary">Total base stats: <strong>{totalStats}</strong></div>
                            <div className="pokemon-stats-list">
                                {stats.map((statEntry) => {
                                    const statName = statEntry.stat.name;
                                    const value = statEntry.base_stat ?? 0;
                                    const percentage = Math.min((value / 255) * 100, 100);

                                    return (
                                        <div key={statName} className="pokemon-stat-row">
                                            <div className="pokemon-stat-meta">
                                                <span>{statLabels[statName] ?? formatLabel(statName)}</span>
                                                <strong>{value}</strong>
                                            </div>
                                            <div className="pokemon-stat-bar" aria-hidden="true">
                                                <span style={{ width: `${percentage}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    </>
}

export default PokemonDetail;