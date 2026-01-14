import { Search, Filter, Heart, LogOut } from "lucide-react";
import { useState } from "react";
import PokemonDetailsModal from "../components/PokemonDetailsModal";

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

function Home(){

    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    const mockPokemons: Pokemon[] = [
        {
            id: 1,
            name: "Bulbasaur",
            types: ["Grass", "Poison"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            stats: { hp: 45, attack: 49, defense: 49, speed: 45 },
            description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon."
        },
        {
            id: 2,
            name: "Ivysaur",
            types: ["Grass", "Poison"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
            stats: { hp: 60, attack: 62, defense: 63, speed: 60 },
            description: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs."
        },
        {
            id: 3,
            name: "Venusaur",
            types: ["Grass", "Poison"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
            stats: { hp: 80, attack: 82, defense: 83, speed: 80 },
            description: "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight."
        },
        {
            id: 4,
            name: "Charmander",
            types: ["Fire"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
            stats: { hp: 39, attack: 52, defense: 43, speed: 65 },
            description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail."
        },
        {
            id: 5,
            name: "Charmeleon",
            types: ["Fire"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
            stats: { hp: 58, attack: 64, defense: 58, speed: 80 },
            description: "When it swings its burning tail, it elevates the temperature to unbearably high levels."
        },
        {
            id: 6,
            name: "Charizard",
            types: ["Fire", "Flying"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
            stats: { hp: 78, attack: 84, defense: 78, speed: 100 },
            description: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally."
        },
        {
            id: 7,
            name: "Squirtle",
            types: ["Water"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
            stats: { hp: 44, attack: 48, defense: 65, speed: 43 },
            description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth."
        },
        {
            id: 8,
            name: "Wartortle",
            types: ["Water"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
            stats: { hp: 59, attack: 63, defense: 80, speed: 58 },
            description: "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance."
        },
        {
            id: 9,
            name: "Blastoise",
            types: ["Water"],
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
            stats: { hp: 79, attack: 83, defense: 100, speed: 78 },
            description: "A brutal Pokémon with pressurized water jets on its shell. They are used for high speed tackles."
        },
    ]

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

    return(
        <div className="min-h-screen bg-[#9bbc0f]">
            <div className="bg-[#8bac0f] border-b-8 border-[#0f380f] shadow-[0_8px_0px_0px_rgba(15,56,15,0.3)]">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="pixel-font text-3xl text-[#0f380f]">POKÉDEX</h1>
                        <div className="flex gap-2">
                            <button onClick={() => {}}
                            className="flex bg-[#306230] text-[#9bbc0f] pixel-font text-xs border-4 rounded-lg border-[#0f380f] px-4 py-2 hover:bg-[#051305] transition-colors duration-300">
                                <Heart className="h-4 w-4 mr-2" />
                                FAVORITOS (2)
                            </button>

                            <button onClick={() => {}}
                            className="flex px-4 py-2 pixel-font text-xs text-white border-4 rounded-lg border-[#0f380f] bg-[#A040A0] hover:bg-[#8030A0] transition-colors duration-300">
                                <LogOut className="h-4 w-4 mr-2" />
                                SAIR
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="pixel-font relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0f380f]" />
                            <input 
                            type="text"
                            placeholder="Buscar pokémon..."
                            className="w-full pl-10 bg-[#9bbc0f] border-4 border-[#0f380f] rounded-lg text-[#0f380f] placeholder:text-[#0f380f]/50 h-12"
                            />
                        </div>

                        <select className="appearance-none pixel-font bg-[#9bbc0f] border-4 border-[#0f380f] rounded-lg text-[#0f380f] px-4">
                            <option value="">Fogo</option>
                            <option value="">Água</option>
                            <option value="">Planta</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        mockPokemons.map((pokemon: Pokemon) => (
                            <div className="bg-[#9bbc0f] border-4 border-[#0f380f] rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(15,56,15,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(15,56,15,0.5)] transition-all cursor-pointer"
                            onClick={() => {
                                setSelectedPokemon(pokemon);
                            }}
                            key={pokemon.id}>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="pixel-font text-xs text-[#0f380f]">#{pokemon.id.toString().padStart(3, '0')}</span>

                                    <button
                                    onClick={() => {}}
                                    className="hover:bg-[#8bac0f] rounded-full p-1 transition-colors duration-300"
                                    >
                                        <Heart className="h-5 w-5 text-[#0f380f] pixel-font m-2"/>
                                    </button>
                                </div>

                                <div className="bg-[#8bac0f] border-2 border-[#0f380f] rounded p-2 mb-3 aspect-square flex items-center justify-center">
                                    <img 
                                    src={pokemon.image} 
                                    alt={pokemon.name} 
                                    className="w-full h-full object-contain pixelated"
                                    />
                                </div>

                                <h3 className="text-[#0f380f] pixel-font text-center mb-2">
                                    {pokemon.name.toUpperCase()}
                                </h3>

                                <div className="flex gap-1 justify-center">
                                    {
                                        pokemon.types.map((type: string) => (
                                            <span key={type}
                                            style={{
                                                backgroundColor: typeColors[type],
                                                color: "#fff",
                                            }}
                                            className="px-2 py-1 rounded text-[10px] pixel-font border-2 border-[#0f380f]">
                                                {type.toUpperCase()}
                                            </span>
                                        ))
                                    }

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {selectedPokemon && (
                <PokemonDetailsModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
                />
            )}
        </div>
    );
}

export default Home;