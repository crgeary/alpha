import { Body, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";

@Service()
@JsonController("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/token")
    async login(@Body() loginDto: LoginDto) {
        return {
            data: await this.authService.loginWithCredentials(loginDto.email, loginDto.password),
        };
    }
}
