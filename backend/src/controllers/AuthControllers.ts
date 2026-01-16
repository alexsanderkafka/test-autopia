import "reflect-metadata";
import { Body, Get, JsonController, Post, Res, UseBefore } from "routing-controllers";
import type UserRequestDTO from "../dto/UserRequestDTO";
import AuthService from "../service/AuthService";

@JsonController("/auth")
export default class AuthControllers{

    private authService: AuthService = new AuthService();

    @Post("/login")
    public async login(@Body({validate: false}) body: UserRequestDTO, @Res() res: any): Promise<any>{

        const result = await this.authService.login(body);

        return res.status(200).json(result);
    }

    @Post("/register")
    public async register(@Body({validate: false}) body: UserRequestDTO, @Res() res: any): Promise<any>{
        const result = await this.authService.register(body);

        return res.status(201).json(result);
    }
}