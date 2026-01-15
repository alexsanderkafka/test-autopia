import prisma from "../db/prisma";
import type PokemonRequestDTO from "../dto/PokemonRequestDTO";

export default class FavoriteRepository{
    public async createFavorite(userId: number, pokemon: any): Promise<void>{
        await prisma.favoritePokemon.create({
            data: {
                pokemonApiId: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                user: {
                    connect: { id: userId }
                },
                types:{
                    create: pokemon.types.map((typeInfo: any) => ({
                        type: {  
                            create: {
                                name: typeInfo.type.name
                            }
                        }
                    }))
                }
            }
        })
    }

    public async deleteFavorite(userId: number, pokemonId: number) {
        await prisma.favoritePokemon.delete({
            where: {
                id: pokemonId,
                userId: userId
            }
        });
    }
}