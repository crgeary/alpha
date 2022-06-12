import { Service } from "typedi";
import { NotFoundException } from "../../../common/exceptions";
import { prisma } from "../../../db";
import { UserDto } from "../dto/user.dto";

@Service()
export class UserService {
    async findById(id: string): Promise<UserDto> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException();
        }

        return UserDto.fromUser(user);
    }
}
