
export default interface PokemonResponseDTO{
    pokemonId: number;
    name: string;
    types: string[];
    imageUrl: string;
    stats: any[];
    isFavorite: boolean;
}