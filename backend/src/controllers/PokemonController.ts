import { Delete, Get, JsonController, Param, Post, QueryParam, QueryParams, Res } from "routing-controllers";
import PokemonService from "../service/PokemonService";

@JsonController("/pokemon")
export default class PokemonController{

    private pokemonService: PokemonService = new PokemonService();

    @Get("/all")
    public async all(@Res() res: any, @QueryParam("page", {required: false}) page: number = 1, @QueryParam("limit", {required: false}) limit: number = 10): Promise<any>{
        const result = await this.pokemonService.getAllPokemon(page, limit);

        return res.status(200).json(result);
    }

    @Get("/:search")
    public async searchByIdOrName(@Res() res: any, @Param("search") search: string): Promise<any>{
        const result = await this.pokemonService.searchPokemon(search);

        return res.status(200).json(result);
    }

    @Get("/filter/:type")
    public async getAllPokemonByType(@Res() res: any, @Param("type") type: string, @QueryParam("page", {required: false}) page: number = 1, @QueryParam("limit", {required: false}) limit: number = 10): Promise<any>{
        const result = await this.pokemonService.getAllPokemonByType(type, page, limit);

        return res.status(200).json(result);
    }

    @Get("/favorite/:userExternalId")
    public async getAllFavoritePokemons(@Res() res: any, @Param("userExternalId") userExternalId: string): Promise<any>{
        const result = await this.pokemonService.getAllFavoritePokemons(userExternalId);

        return res.status(200).json(result);
    }

    @Post("/favorite/:userExternalId/:pokemonApiId")
    public async addFavoritePokemon(@Res() res: any, @Param("userExternalId") userExternalId: string, @Param("pokemonApiId") pokemonApiId: number): Promise<any>{
        await this.pokemonService.addFavoritePokemon(userExternalId, pokemonApiId);

        return res.status(201).json({message: "Pokemon added to favorites successfully"});
    }

    @Delete("/favorite/:userExternalId/:pokemonId")
    public async deleteFavoritePokemon(@Res() res: any, @Param("userExternalId") userExternalId: string, @Param("pokemonId") pokemonId: number): Promise<any>{
        await this.pokemonService.deleteFavoritePokemon(userExternalId, pokemonId);

        return res.status(204).send();
    }

}