import "dotenv/config"
import jwt from 'jsonwebtoken';
import TokenJWTError from '../err/TokenJWTError';

export default abstract class TokenJWT {

    public static generateToken(email: string): string{
        const secret = process.env.JWT_SECRET_KEY as string;
        
        let token = jwt.sign({ email }, secret, { expiresIn: 300 });
        return token;
    }

    public static generateRefreshToken(email: string): string{
        const secret = process.env.JWT_SECRET_KEY as string;
        
        let token = jwt.sign({ email }, secret, { expiresIn: 600 });
        return token;
    }

    public static verifyToken(token: string, endpoint: string){
        const secret = process.env.JWT_SECRET_KEY as string;
    
        try{
            jwt.verify(token, secret);
            console.log("Token is valid.");
            return;
        }catch(err){
            console.log("Token is invalid.");
            throw new TokenJWTError("Token is invalid.");
        }
        
    }
}