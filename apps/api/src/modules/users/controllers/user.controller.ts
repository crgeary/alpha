import { Controller, Get, Param } from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services/user.service";

@Service()
@Controller("/users")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get("/:id")
    async findOne(@Param("id") id: string) {
        return {
            data: await this.userService.findById(id),
        };
    }
}
