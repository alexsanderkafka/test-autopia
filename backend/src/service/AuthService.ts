import type UserRequestDTO from "../dto/UserRequestDTO";
import UserRepository from "../repository/UserRepository";

export default class AuthService{

    private userRepository: UserRepository = new UserRepository()
    
    public async login(dto: UserRequestDTO): Promise<any>{
        const user: any = await this.userRepository.findUserByEmail(dto.email);

        if(!user){
            return {message: "User not found"};
        }

        return user;
    }

    public async register(body: UserRequestDTO): Promise<void>{
        this.userRepository.createUser(body);
    }
}