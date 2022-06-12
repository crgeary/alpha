import { Service } from "typedi";
import { UserDto } from "../dto/user.dto";

@Service()
export class UserService {
    async findById(id: string): Promise<UserDto> {
        return {
            id,
            name: "Lorem ipsum",
            email: "lorem@example.com",
            image: null,
            createdAt: new Date(),
            updatedAt: null,
        };
    }
}
