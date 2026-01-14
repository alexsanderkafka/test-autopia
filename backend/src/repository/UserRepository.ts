import prisma from "../db/prisma";
import type UserRequestDTO from "../dto/UserRequestDTO";

export default class UserRepository{

    public async findUserByEmail(email: string){
        return prisma.user.findUnique({
            where: { email }
        });
    }

    public async createUser(dto: UserRequestDTO): Promise<void>{
        await prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password
            }
        });
    }

}