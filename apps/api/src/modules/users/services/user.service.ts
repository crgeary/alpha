import { NotFoundException } from "@app/common";
import { Service } from "typedi";
import { prisma } from "../../../db";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserDto } from "../dtos/user.dto";
import { hashPassword } from "../utils/password.util";
import { isUndefined } from "lodash";

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

    async findMany(): Promise<UserDto[]> {
        return (await prisma.user.findMany()).map(UserDto.fromUser);
    }

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const user = await prisma.user.create({
            data: {
                ...createUserDto,
                password: await hashPassword(createUserDto.password),
            },
        });

        return UserDto.fromUser(user);
    }

    async updateById(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
        const count = await prisma.user.count({
            where: { id },
        });

        if (!count) {
            throw new NotFoundException(`User with id '${id}' does not exist`);
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                ...updateUserDto,
                password: !isUndefined(updateUserDto.password)
                    ? await hashPassword(updateUserDto.password)
                    : undefined,
            },
        });

        return UserDto.fromUser(user);
    }

    async deleteById(id: string): Promise<void> {
        const count = await prisma.user.count({
            where: { id },
        });

        if (!count) {
            throw new NotFoundException(`User with id '${id}' does not exist`);
        }

        await prisma.user.delete({
            where: { id },
        });
    }
}
