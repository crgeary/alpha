import { Service } from "typedi";
import { prisma } from "../../../db";
import { UnauthorizedException } from "@app/common";
import { comparePassword } from "../utils/password.util";
import { UserDto } from "../dtos/user.dto";
import { createAccessToken } from "../utils/jwt.util";

@Service()
export class AuthService {
    async validateUserByCredentials(email: string, password: string): Promise<UserDto> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException("Email was not found");
        }

        const passwordMatches = await comparePassword(password, user.password);

        if (!passwordMatches) {
            throw new UnauthorizedException("Incorrect password");
        }

        return UserDto.fromUser(user);
    }

    async loginWithCredentials(email: string, password: string) {
        const user = await this.validateUserByCredentials(email, password);
        const accessToken = await createAccessToken(user.id);

        return {
            accessToken,
            user,
        };
    }
}
