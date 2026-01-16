import type { ExpressMiddlewareInterface } from "routing-controllers";
import TokenJWT from "../security/TokenJWT";
import TokenJWTError from "../err/TokenJWTError";

export default class SecurityFilter implements ExpressMiddlewareInterface{

    use(request: any, response: any, next: (err?: any) => any) {
        const tokenHeader: any = request.headers.authorization;

        if(!tokenHeader) return response.status(401).json({ message: "Token not found"});

        const jwt: string = tokenHeader.split(" ")[1];

        if(!jwt) return response.status(401).json({ message: "Token not found"});

        try{
            TokenJWT.verifyToken(jwt, request.route.path);
        }catch(err){
            if(err instanceof TokenJWTError){
                return response.status(401).json(err.toJSON());
            }
        }

        next();
    }

}