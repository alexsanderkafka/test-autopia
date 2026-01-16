import { Search, Heart, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect} from "react";
import PokemonDetailsModal from "../components/PokemonDetailsModal";
import { pokemonApi } from "../api";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { typeColors, types, type Pokemon } from "../types/PokemonType";
import { usePokemon } from "../store/PokemonContext";

function Home(){

    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const { pokemons, setPokemons } = usePokemon();
    const [token, setToken] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);

    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("all")

    const [isfavorite, setIsFavorite] = useState<boolean>(false);

    const navigate = useNavigate();
    
    useEffect(() => {
        const tokenJwt: string = localStorage.getItem("token") || "";
        findAllPokemons(currentPage);
        setToken(tokenJwt);
    }, []);

    function navigationPage(page: number){
        if(filter !== "all"){
            filterAllPokemon(page, filter);
        }else{
            findAllPokemons(page);
        }
    }

    function filterAllPokemon(page: number, type: string){
        pokemonApi.get(`pokemon/filter/${type}?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response: any) => {
            setPokemons(response.data.data);    
            setCurrentPage(response.data.page);
            setTotalPage(response.data.totalPages);
        });
    }

    function findAllPokemons(page: number){
        console.log(2);
        pokemonApi.get(`pokemon/all?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response: any) => {
            setPokemons(response.data.data);
            setCurrentPage(response.data.page);
            setTotalPage(response.data.totalPages);
            setLoading(false);
        });
    }

    function handlerSearch(){
        console.log(search);

        pokemonApi.get(`pokemon/${search}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response: any) => {
            console.log(response.data);

            setPokemons(Array.isArray(response.data) ? response.data : [response.data]);
            setCurrentPage(1);
            setTotalPage(0);
        });
    }

    function getAllFavorites(){
        const userExternalId: string = localStorage.getItem("userExternalId") || "";

        setLoading(true);

        pokemonApi.get(`pokemon/favorite/${userExternalId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response: any) => {
            console.log(response.data);
            setPokemons(response.data);
            setCurrentPage(1);
            setTotalPage(0);
            setLoading(false);
        });
    }

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("userExternalId");

        navigate("/");
    }

    return(
        <div className="min-h-screen bg-[#9bbc0f]">
            <div className="bg-[#8bac0f] border-b-8 border-[#0f380f] shadow-[0_8px_0px_0px_rgba(15,56,15,0.3)]">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="pixel-font text-3xl text-[#0f380f]">POKÉDEX</h1>
                        <div className="flex gap-2">
                            <button onClick={() => {
                                setIsFavorite(!isfavorite);

                                if(!isfavorite) {
                                    findAllPokemons(currentPage);
                                    return;
                                }
                                
                                getAllFavorites();
                                
                            }}
                            className="flex bg-[#306230] text-[#9bbc0f] pixel-font text-xs border-4 rounded-lg border-[#0f380f] px-4 py-2 hover:bg-[#051305] transition-colors duration-300">
                                <Heart className="h-4 w-4 mr-2" />
                                FAVORITOS
                            </button>

                            <button onClick={logout}
                            className="flex px-4 py-2 pixel-font text-xs text-white border-4 rounded-lg border-[#0f380f] bg-[#A040A0] hover:bg-[#8030A0] transition-colors duration-300">
                                <LogOut className="h-4 w-4 mr-2" />
                                SAIR
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="pixel-font relative w-full">
                            <button
                            onClick={handlerSearch}
                            >
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#0f380f] hover:text-[#8bac0f] transition-colors duration-300" />
                            </button>
                            <input 
                            type="text"
                            placeholder="Buscar pokémon..."
                            className="w-full pl-10 bg-[#9bbc0f] border-4 border-[#0f380f] rounded-lg text-[#0f380f] placeholder:text-[#0f380f]/50 h-12"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handlerSearch();
                                }
                            }}      
                            />
                        </div>

                        <select className="appearance-none pixel-font bg-[#9bbc0f] border-4 border-[#0f380f] rounded-lg text-[#0f380f] px-4"
                        onChange={(e) => {
                            const selectedType = e.target.value;

                            setFilter(selectedType)

                            if(e.target.value !== "all"){
                                filterAllPokemon(1, selectedType);
                            }else{
                                findAllPokemons(1);
                            }
                        }}
                        value={filter}
                        >
                            {
                                types.map((type: string) => (
                                    <option key={type} value={type}>
                                        {type.toUpperCase()}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-8">
                {!loading ?
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pokemons &&
                        pokemons.map((pokemon: Pokemon) => (
                            <div className="bg-[#9bbc0f] border-4 border-[#0f380f] rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(15,56,15,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(15,56,15,0.5)] transition-all cursor-pointer"
                            onClick={() => {
                                setSelectedPokemon(pokemon);
                            }}
                            key={pokemon.pokemonId}>
                                <span className="pixel-font text-xs text-[#0f380f] mb-4">#{pokemon.pokemonId.toString().padStart(3, '0')}</span>

                                <div className="bg-[#8bac0f] border-2 border-[#0f380f] rounded p-2 mb-3 aspect-square flex items-center justify-center">
                                    <img 
                                    src={pokemon.imageUrl} 
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
                </div> :
                <div className="w-full flex items-center justify-center">
                    <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="#0f380f"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
                </div>
                }
            </div>

            {selectedPokemon && (
                <PokemonDetailsModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
                tokenJwt={token}
                />
            )}

            {
                totalPage > 1 && !loading && 
                <div className="container mx-auto px-4 py-4 flex justify-center">
                    <div className="flex items-center gap-4">
                        <button
                        onClick={() => {
                            if(currentPage > 1){
                                navigationPage(currentPage - 1);
                            }
                        }}
                        className="bg-[#306230] hover:bg-[#0f380f] text-[#9bbc0f] border-4 border-[#0f380f] pixel-font text-xs"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-[#0f380f] pixel-font">
                            Página {currentPage} de {totalPage}
                        </span>
                        <button
                        onClick={() => {
                            if(currentPage < totalPage){
                                navigationPage(currentPage + 1);
                            }
                        }}
                        className="bg-[#306230] hover:bg-[#0f380f] text-[#9bbc0f] border-4 border-[#0f380f] pixel-font text-xs"
                        >
                            <ChevronRight className="h-4 w-4"  />
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;