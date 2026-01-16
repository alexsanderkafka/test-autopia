import { Heart, HeartCrack, X } from "lucide-react";
import { pokemonApi } from "../api";
import { typeColors, type Pokemon } from "../types/PokemonType";
import { usePokemon } from "../store/PokemonContext";

interface PokemonDetailsModalProps {
    pokemon: Pokemon;
    onClose: () => void;
    tokenJwt: string;
}

function PokemonDetailsModal(props: PokemonDetailsModalProps) {

    const { removePokemon } = usePokemon();

    function addNewFavorite(){
        const userExternalId: string = localStorage.getItem("userExternalId") || "";

        pokemonApi.post(`pokemon/favorite/${userExternalId}/${props.pokemon.pokemonId}`, null, {
            headers: {
                Authorization: `Bearer ${props.tokenJwt}`
            }
        }).then((response: any) => {
            console.log(response);
        }).catch((error: any) => {
            console.log(error);
        });
    }

    function removeFavorite(){
        const userExternalId: string = localStorage.getItem("userExternalId") || "";

        pokemonApi.delete(`pokemon/favorite/${userExternalId}/${props.pokemon.pokemonId}`, {
            headers: {
                Authorization: `Bearer ${props.tokenJwt}`
            }
        }).then((response: any) => {
            if(response.status === 204){
                removePokemon(props.pokemon.pokemonId);
                props.onClose();
            }
        }).catch((error: any) => {
            console.log(error);
        });
    }

    console.log(props.pokemon.stats)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#9bbc0f] border-4 border-[#0f380f] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_0px_rgba(15,56,15,0.5)]">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-sm text-[#0f380f] pixel-font">
                                #{props.pokemon.pokemonId.toString().padStart(3, "0")}
                            </span>
                            <h2 className="text-2xl text-[#0f380f] pixel-font mt-1">
                                {props.pokemon.name.toUpperCase()}
                            </h2>
                        </div>

                        <div className="flex gap-2">
                            <button
                            onClick={() => {
                                if(!props.pokemon.isFavorite){
                                    addNewFavorite();
                                }else{
                                    removeFavorite();
                                }
                                
                            }}
                            className="hover:bg-[#8bac0f] rounded-full p-1 transition-colors duration-300"
                            >
                                {
                                    !props.pokemon.isFavorite ? 
                                    <Heart className="h-5 w-5 text-[#0f380f] pixel-font m-2" /> 
                                    : 
                                    <HeartCrack className="h-5 w-5 text-[#ff0000] pixel-font m-2" />
                                }
                                
                                
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
                            <img src={props.pokemon.imageUrl} alt={props.pokemon.name}
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
                                    {props.pokemon.stats.map((stat: any) => (
                                        <div key={stat.name}>
                                            <div className="flex justify-between text-xs pixel-font text-[#0f380f] mb-1">
                                                <span>{stat.name}</span>
                                                <span>{stat.value}</span>
                                            </div>
                                            <div className="bg-[#306230] border-2 border-[#0f380f] rounded-full h-4 overflow-hidden">
                                                <div
                                                className="bg-[#0f380f] h-full transition-all"
                                                style={{
                                                  width: `${(stat.value / 160) * 100}%`,
                                                }}
                                            ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetailsModal;