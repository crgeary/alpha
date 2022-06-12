export class UserDto {
    id!: string;
    email!: string;
    name!: string;
    image!: string | null;
    createdAt!: Date;
    updatedAt!: Date | null;
}
