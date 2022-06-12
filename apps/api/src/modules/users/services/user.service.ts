import { NotFoundException } from "@app/common";
import { Service } from "typedi";
import { prisma } from "../../../db";
import { UserDto } from "../dto/user.dto";

@Service()
export class UserService {
    async findById(id: string): Promise<UserDto> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with id '${id}' does not exist`);
        }

        return UserDto.fromUser(user);
    }
}
