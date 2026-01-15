
import axios from "axios";
import type PokemonResponseDTO from "../dto/PokemonResponseDTO";
import UserRepository from "../repository/UserRepository";
import FavoriteRepository from "../repository/FavoriteRepository";
import NotFoundError from "../err/NotFoundError";
import ExistingEntityError from "../err/ExistingEntityError";
import type PokemonRequestDTO from "../dto/PokemonRequestDTO";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default class PokemonService{

    private userRepository: UserRepository = new UserRepository();
    private favoriteRepository: FavoriteRepository = new FavoriteRepository();

    public async getAllPokemon(page: number, limit: number): Promise<any>{
        const offset: number = (page - 1) * limit;

        //Tratamento de erros

        const response: any = await pokeApi.get(`pokemon?offset=${offset}&limit=${limit}`);

        const dtoList: PokemonResponseDTO[] = await Promise.all(
            response.data.results.map(async (pokemon: any) => {
                const details: any = await pokeApi.get(pokemon.url);

                return {
                    pokemonId: details.data.id,
                    name: details.data.name,
                    types: details.data.types.map((typeInfo: any) => typeInfo.type.name),
                    imageUrl: details.data.sprites.front_default
                }
            })
        );

        const total: number = response.data.count;
        const totalPages: number = Math.ceil(total / limit);
        const nextPage: number = Number(page) < totalPages ? Number(page) + 1 : totalPages;
        const prevPage: number = page > 1 ? page - 1 : 0;

        return {
            data: dtoList,
            total,
            totalPages,
            limit,
            nextPage,
            prevPage,
            page: Number(page),
        };
    }

    public async searchPokemon(search: string): Promise<PokemonResponseDTO>{
        //Tratamento de erros

        const currentPokemon: any = await pokeApi.get(`pokemon/${search.toLowerCase()}`);

        const dto: PokemonResponseDTO = {
            pokemonId: currentPokemon.data.id,
            name: currentPokemon.data.name,
            types: currentPokemon.data.types.map((typeInfo: any) => typeInfo.type.name),
            imageUrl: currentPokemon.data.sprites.front_default
        }

        return dto;
    }

    public async getAllPokemonByType(type: string, page: number, limit: number) {
        //Tratamento de erros
        const response: Record<any, any> = await pokeApi.get(`type/${type.toLowerCase()}`);

        const allPokemons: Record<any, any> = response.data.pokemon;
        const total: number = allPokemons.length;

        const offset = (page - 1) * limit;
        const paginatedPokemons = allPokemons.slice(offset, offset + limit);

        const dtoList: PokemonResponseDTO[] = await Promise.all(
            paginatedPokemons.map(async (data: any) => {
                const details: any = await pokeApi.get(data.pokemon.url);

                return {
                    pokemonId: details.data.id,
                    name: details.data.name,
                    types: details.data.types.map((typeInfo: any) => typeInfo.type.name),
                    imageUrl: details.data.sprites.front_default
                }
            })
        );

        const totalPages: number = Math.ceil(total / limit);
        const nextPage: number = Number(page) < totalPages ? Number(page) + 1 : totalPages;
        const prevPage: number = page > 1 ? page - 1 : 0;

        return {
            data: dtoList,
            total,
            totalPages,
            limit,
            nextPage,
            prevPage,
            page: Number(page),
        };
    }

    public async addFavoritePokemon(userExternalId: string, pokemonApiId: number){
        //Verificar se o pokemonApiId é valido, realmente existe na 
        //Voltar o error caso já exista o favorito para o usuário

        const pokemon: any = await pokeApi.get(`pokemon/${pokemonApiId}`);

        const user: any = await this.userRepository.findByExternalId(userExternalId);

        if(!user) throw new NotFoundError("User not found");

        this.favoriteRepository.createFavorite(user.id, pokemon.data);
    }

}