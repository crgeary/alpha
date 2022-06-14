import { User } from "@prisma/client";

export class UserDto {
    id!: string;
    email!: string;
    name!: string;
    image!: string | null;
    createdAt!: Date;
    updatedAt!: Date | null;

    static fromUser(user: User): UserDto {
        const userDto = new UserDto();

        userDto.id = user.id;
        userDto.email = user.email;
        userDto.name = user.name;
        userDto.image = user.image;
        userDto.createdAt = user.createdAt;
        userDto.updatedAt = user.updatedAt;

        return userDto;
    }
}
