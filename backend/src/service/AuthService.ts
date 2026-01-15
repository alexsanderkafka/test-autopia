import type TokenResponseDTO from "../dto/TokenResponseDTO";
import type UserRequestDTO from "../dto/UserRequestDTO";
import ExistingUserError from "../err/ExistingUserError";
import InvalidPasswordError from "../err/InvalidPasswordError";
import NotFoundEntityError from "../err/NotFoundEntityError";
import UserRepository from "../repository/UserRepository";
import PasswordEncoder from "../security/PasswordEncoder";
import TokenJWT from "../security/TokenJWT";

export default class AuthService{
    private userRepository: UserRepository = new UserRepository()

    public async login(dto: UserRequestDTO): Promise<any>{
        const user: any = await this.userRepository.findUserByEmail(dto.email);

        if(!user){
            throw new NotFoundEntityError("User not found");
        }

        const isPasswordValid = await PasswordEncoder.comparePassword(dto.password, user.password);

        if(!isPasswordValid){
            throw new InvalidPasswordError("Invalid password");
        }

        const jwt = TokenJWT.generateToken(user.email);
        const refreshToken = TokenJWT.generateRefreshToken(user.email);

        const tokenDto: TokenResponseDTO = {
            authenticated: true,
            accessToken: jwt,
            refreshToken: refreshToken
        }

        return tokenDto;
    }

    public async register(body: UserRequestDTO): Promise<void>{
        const user: any = await this.userRepository.findUserByEmail(body.email);

        if(user){
            throw new ExistingUserError("User already exists");
        }

        body.password = await PasswordEncoder.encode(body.password);

        this.userRepository.createUser(body);
    }
}