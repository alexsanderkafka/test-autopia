import { Heart, X } from "lucide-react";

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  description: string;
}

interface PokemonDetailsModalProps {
    pokemon: Pokemon;
    onClose: () => void;
}

function PokemonDetailsModal(props: PokemonDetailsModalProps) {
    const typeColors: Record<string, string> = {
        Normal: "#A8A878",
        Fire: "#F08030",
        Water: "#6890F0",
        Electric: "#F8D030",
        Grass: "#78C850",
        Ice: "#98D8D8",
        Fighting: "#C03028",
        Poison: "#A040A0",
        Ground: "#E0C068",
        Flying: "#A890F0",
        Psychic: "#F85888",
        Bug: "#A8B820",
        Rock: "#B8A038",
        Ghost: "#705898",
        Dragon: "#7038F8",
        Dark: "#705848",
        Steel: "#B8B8D0",
        Fairy: "#EE99AC"
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#9bbc0f] border-4 border-[#0f380f] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_0px_rgba(15,56,15,0.5)]">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-sm text-[#0f380f] pixel-font">
                                #{props.pokemon.id.toString().padStart(3, "0")}
                            </span>
                            <h2 className="text-2xl text-[#0f380f] pixel-font mt-1">
                                {props.pokemon.name.toUpperCase()}
                            </h2>
                        </div>

                        <div className="flex gap-2">
                            <button
                            onClick={() => {}}
                            className="hover:bg-[#8bac0f] rounded-full p-1 transition-colors duration-300"
                            >
                                <Heart className="h-5 w-5 text-[#0f380f] pixel-font m-2"/>
                            </button>
                            <button
                            onClick={props.onClose}
                            className="hover:bg-[#8bac0f] rounded-full p-1 transition-colors duration-300"
                            >
                                <X className="h-5 w-5 text-[#0f380f] pixel-font m-2"/>
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#8bac0f] border-4 border-[#0f380f] rounded-lg p-6 flex items-center justify-center">
                            <img src={props.pokemon.image} alt={props.pokemon.name}
                            className="w-full max-w-[300px] h-auto pixelated"
                            />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="pixel-font text-xs text-[##0f380f] mb-2">TIPOS</h3>

                                <div className="flex gap-2 flex-wrap">
                                    {props.pokemon.types.map((type: string) => (
                                        <span key={type}
                                        className="px-3 py-2 rounded pixel-font text-xs border-2 border-[#0f380f]"
                                        style={{
                                            backgroundColor: typeColors[type],
                                            color: "#fff",
                                        }}
                                        >
                                            {type.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="pixel-font text-xs text-[##0f380f] mb-3">
                                    ESTATÍSTICAS
                                </h3>

                                <div className="space-y-2">
                                    {Object.entries(props.pokemon.stats).map(([statName, statValue]: [string, number]) => (
                                        <div key={statName}>
                                            <div className="flex justify-between text-xs pixel-font text-[#0f380f] mb-1">
                                                <span>{statName.toUpperCase()}</span>
                                                <span>{statValue}</span>
                                            </div>
                                            <div className="bg-[#306230] border-2 border-[#0f380f] rounded-full h-4 overflow-hidden">
                                                <div
                                                className="bg-[#0f380f] h-full transition-all"
                                                style={{
                                                  width: `${(statValue / 160) * 100}%`,
                                                }}
                                            ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-[#8bac0f] border-4 border-[#0f380f] rounded-lg p-4">
                        <h3 className="text-xs text-[#0f380f] pixel-font mb-2">
                            DESCRIÇÃO
                        </h3>
                        <p className="text-[10px] text-[#0f380f] pixel-font leading-relaxed">
                            {props.pokemon.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetailsModal;