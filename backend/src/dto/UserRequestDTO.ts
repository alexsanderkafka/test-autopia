import { IsNotEmpty, IsString } from "class-validator";

export default class UserRequestDTO{

    @IsString({ message: 'email must be a string' })
    @IsNotEmpty({ message: 'email is required' })
    public email!: string;

    @IsString({ message: 'password must be a string' })
    @IsNotEmpty({ message: 'password is required' })
    public password!: string;
}