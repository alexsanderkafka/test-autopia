
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

        const response: any = await pokeApi.get(`pokemon?offset=${offset}&limit=${limit}`);

        const dtoList: PokemonResponseDTO[] = await Promise.all(
            response.data.results.map(async (pokemon: any) => {
                const details: any = await pokeApi.get(pokemon.url);

                return {
                    pokemonId: details.data.id,
                    name: details.data.name,
                    types: details.data.types.map((typeInfo: any) => typeInfo.type.name),
                    imageUrl: details.data.sprites.front_default,
                    stats: details.data.stats.map((stat: any) => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    })),
                    isFavorite: false
                }
            })
        );

        const total: number = response.data.count;
        const totalPages: number = Math.ceil(total / limit);
        const nextPage: number = Number(page) < totalPages ? Number(page) + 1 : totalPages;
        const prevPage: number = page > 1 ? page - 1 : 1;

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
        const currentPokemon: any = await pokeApi.get(`pokemon/${search.toLowerCase()}`);

        const dto: PokemonResponseDTO = {
            pokemonId: currentPokemon.data.id,
            name: currentPokemon.data.name,
            types: currentPokemon.data.types.map((typeInfo: any) => typeInfo.type.name),
            imageUrl: currentPokemon.data.sprites.front_default,
            stats: currentPokemon.data.stats.map((stat: any) => ({
                name: stat.stat.name,
                value: stat.base_stat
            })),
            isFavorite: false
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

                console.log(details.data.stats);

                return {
                    pokemonId: details.data.id,
                    name: details.data.name,
                    types: details.data.types.map((typeInfo: any) => typeInfo.type.name),
                    imageUrl: details.data.sprites.front_default,
                    stats: details.data.stats.map((stat: any) => ({
                        name: stat.stat.name,
                        value: stat.base_stat
                    })),
                    isFavorite: false
                }
            })
        );

        const totalPages: number = Math.ceil(total / limit);
        const nextPage: number = Number(page) < totalPages ? Number(page) + 1 : totalPages;
        const prevPage: number = page > 1 ? page - 1 : 1;

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
        const pokemon: any = await pokeApi.get(`pokemon/${pokemonApiId}`);

        const user: any = await this.userRepository.findByExternalId(userExternalId);

        if(!user) throw new NotFoundError("User not found");
            
        try{
            await this.favoriteRepository.createFavorite(user.id, pokemon.data);
        }catch(err: any){
            if(err.code === "P2002") throw new ExistingEntityError("Esse pokemon já está entre seus favoritos");
        }

    }

    public async getAllFavoritePokemons(userExternalId: string): Promise<any>{
        const user: any = await this.userRepository.findByExternalId(userExternalId);

        if(!user) throw new NotFoundError("User not found");
        
        const dtoList: PokemonResponseDTO[] = user.favorites.map((favorite: any) => ({
            pokemonId: favorite.id,
            name: favorite.name,
            types: favorite.types.map((typeInfo: any) => typeInfo.type.name),
            imageUrl: favorite.image,
            stats: favorite.stats.map((stat: any) => ({
                name: stat.stat.name,
                value: stat.stat.value
            })),
            isFavorite: true
        }));

        return dtoList;
    }

    public async deleteFavoritePokemon(userExternalId: string, pokemonId: number): Promise<void> {
        //Deletar o favorito
        //ERror caso o pokemon não esteja entre os favoritos do usuário
        const user: any = await this.userRepository.findByExternalId(userExternalId);

        if(!user) throw new NotFoundError("User not found");

        //const favorite: any = await this.favoriteRepository.findFavorite(pokemonId);

        //if(!favorite) throw new NotFoundError("Favorite not found");

        try{
            await this.favoriteRepository.deleteFavorite(user.id, Number(pokemonId));
        }catch(err: any){
            if(err.code === "P2025") throw new NotFoundError("Esse pokemon não está entre seus favoritos");
        }

        
    }

}