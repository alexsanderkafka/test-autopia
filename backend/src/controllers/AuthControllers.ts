import "reflect-metadata";
import { Get, JsonController, Res } from "routing-controllers";

@JsonController("/auth")
export default class AuthControllers{

    @Get("/login")
    public async login(@Res() res: any){
        return res.status(200).json({message: "Login successful"});
    }
}