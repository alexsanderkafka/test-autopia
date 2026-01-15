import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class PokemonRequestDTO{
    @IsNotEmpty({ message: 'pokemonId is required' })
    @IsNumber({}, { message: 'pokemonId must be a number' })
    pokemonId!: number;

    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name is required' })
    name!: string;

    @IsNotEmpty({ message: 'types is required' })
    types!: string[];

    @IsString({ message: 'imageUrl must be a string' })
    @IsNotEmpty({ message: 'imageUrl is required' })
    imageUrl!: string;
}