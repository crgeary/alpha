import { isEnv } from "@app/common";
import { Response } from "express";
import ms from "ms";
import { Body, CookieParam, JsonController, Post, Res } from "routing-controllers";
import { Service } from "typedi";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";

@Service()
@JsonController("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/token")
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const { user, accessToken } = await this.authService.loginWithCredentials(
            loginDto.email,
            loginDto.password,
        );

        res.cookie("auth", accessToken, {
            httpOnly: true,
            path: "/",
            sameSite: isEnv("production") ? "strict" : "lax",
            secure: isEnv("production"),
            maxAge: ms("1h"),
        });

        return res.json({
            data: {
                user,
            },
        });
    }
}
