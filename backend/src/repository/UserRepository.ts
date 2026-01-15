import prisma from "../db/prisma";
import type UserRequestDTO from "../dto/UserRequestDTO";

export default class UserRepository{
    public async findUserByEmail(email: string){
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    public async createUser(dto: UserRequestDTO){
        await prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password
            }
        });
    }

    public async findByExternalId(userExternalId: string){
        return await prisma.user.findUnique({
            where: { externalId: userExternalId },
            include: { favorites: true }
        });
    }

}