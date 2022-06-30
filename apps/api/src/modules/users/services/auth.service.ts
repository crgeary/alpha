import { UnauthorizedException } from "@alpha/common";
import { Service } from "typedi";
import { prisma } from "../../../db";
import { UserDto } from "../dtos/user.dto";
import { comparePassword } from "../utils/password.util";
import { JwtService } from "./jwt.service";

@Service()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

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
        const tokens = await this.jwtService.createAuthTokens(user.id);

        return {
            ...tokens,
            user,
        };
    }
}
