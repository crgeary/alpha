import { Get, JsonController, Param } from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services/user.service";

@Service()
@JsonController("/users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/")
    async findMany() {
        return {
            data: await this.userService.findMany(),
        };
    }

    @Get("/:id")
    async findOne(@Param("id") id: string) {
        return {
            data: await this.userService.findById(id),
        };
    }
}
