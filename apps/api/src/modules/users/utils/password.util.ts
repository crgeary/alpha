import { compare, hash } from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

export const hashPassword = (password: string) => {
    return hash(password, BCRYPT_SALT_ROUNDS);
};

export const comparePassword = (password: string, hash: string) => {
    return compare(password, hash);
};
