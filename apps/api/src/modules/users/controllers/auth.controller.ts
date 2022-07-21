import { Body, Controller, Post, Res } from "@alpha/http-server";
import { Response } from "express";
import ms from "ms";
import { JWT_ACCESS_TOKEN_LIFETIME, JWT_REFRESH_TOKEN_LIFETIME } from "../constants";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";
import { getAuthCookieOptions } from "../utils/cookie.util";

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/token")
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const { user, accessToken, refreshToken } = await this.authService.loginWithCredentials(
            loginDto.email,
            loginDto.password,
        );

        return res
            .cookie(
                "auth.at",
                accessToken,
                getAuthCookieOptions({
                    maxAge: ms(JWT_ACCESS_TOKEN_LIFETIME),
                }),
            )
            .cookie(
                "auth.rt",
                refreshToken,
                getAuthCookieOptions({
                    maxAge: ms(JWT_REFRESH_TOKEN_LIFETIME),
                }),
            )
            .json({
                data: {
                    user,
                },
            });
    }
}
