import type TokenResponseDTO from "../dto/TokenResponseDTO";
import type UserRequestDTO from "../dto/UserRequestDTO";
import ExistingEntityError from "../err/ExistingEntityError";
import InvalidPasswordError from "../err/InvalidPasswordError";
import NotFoundEntityError from "../err/NotFoundError";
import UserRepository from "../repository/UserRepository";
import PasswordEncoder from "../security/PasswordEncoder";
import TokenJWT from "../security/TokenJWT";

export default class AuthService{
    private userRepository: UserRepository = new UserRepository()

    public async login(dto: UserRequestDTO): Promise<any>{
        const user: any = await this.userRepository.findUserByEmail(dto.email);

        if(!user){
            throw new NotFoundEntityError("Usuário não encontrado");
        }

        const isPasswordValid = await PasswordEncoder.comparePassword(dto.password, user.password);

        if(!isPasswordValid){
            throw new InvalidPasswordError("Senha inválida");
        }

        const jwt = TokenJWT.generateToken(user.email);
        const refreshToken = TokenJWT.generateRefreshToken(user.email);

        const tokenDto: TokenResponseDTO = {
            userExternalId: user.externalId,
            email: user.email,
            authenticated: true,
            accessToken: jwt,
            refreshToken: refreshToken
        }

        return tokenDto;
    }

    public async register(body: UserRequestDTO): Promise<TokenResponseDTO>{
        const user: any = await this.userRepository.findUserByEmail(body.email);

        if(user){
            throw new ExistingEntityError("Usuário já cadastrado");
        }

        body.password = await PasswordEncoder.encode(body.password);

        const newUser: any = await this.userRepository.createUser(body);

        const jwt = TokenJWT.generateToken(newUser.email);
        const refreshToken = TokenJWT.generateRefreshToken(newUser.email);

        const dto: TokenResponseDTO = {
            userExternalId: newUser.externalId,
            email: newUser.email,
            authenticated: true,
            accessToken: jwt,
            refreshToken: refreshToken
        }

        return dto;
    }
}