import jwt from 'jsonwebtoken';
import TokenJWTError from '../err/TokenJWTError';

export default abstract class TokenJWT {

    private static mySecretKey: string = "MY_SECRET_KEY";

    public static generateToken(email: string): string{
        let token = jwt.sign({ email }, this.mySecretKey, { expiresIn: 300 });
        return token;
    }

    public static generateRefreshToken(email: string): string{
        let token = jwt.sign({ email }, this.mySecretKey, { expiresIn: 600 });
        return token;
    }

    public static verifyToken(token: string, endpoint: string){
        jwt.verify(token, this.mySecretKey, (err, decoded) => {

            console.log(decoded);

            if(err){
                console.log("Token is invalid."); 
                throw new TokenJWTError("Token is invalid.");
            }else{
                console.log("Token is valid.");
                return;
            }
        });
    }
}