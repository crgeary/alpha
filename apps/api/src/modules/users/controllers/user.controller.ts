import { HttpStatus } from "@alpha/common";
import { Body, Controller, Delete, Get, HttpCode, Params, Patch, Post } from "@alpha/http-server";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserService } from "../services/user.service";

@Controller("/users")
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
    async findOne(@Params("id") id: string) {
        return {
            data: await this.userService.findById(id),
        };
    }

    @Patch("/:id")
    async update(@Params("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return {
            data: await this.userService.updateById(id, updateUserDto),
        };
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Params("id") id: string) {
        return this.userService.deleteById(id);
    }
}
