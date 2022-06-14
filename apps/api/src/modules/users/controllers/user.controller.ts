import { HttpStatus } from "@app/common";
import {
    Body,
    Delete,
    Get,
    HttpCode,
    JsonController,
    Param,
    Patch,
    Post,
} from "routing-controllers";
import { Service } from "typedi";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
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

    @Post("/")
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        return {
            data: await this.userService.create(createUserDto),
        };
    }

    @Get("/:id")
    async findOne(@Param("id") id: string) {
        return {
            data: await this.userService.findById(id),
        };
    }

    @Patch("/:id")
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return {
            data: await this.userService.updateById(id, updateUserDto),
        };
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param("id") id: string) {
        return this.userService.deleteById(id);
    }
}
