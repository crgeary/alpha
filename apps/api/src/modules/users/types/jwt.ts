import { JwtPayload } from "jsonwebtoken";
import { SetRequired } from "type-fest";

export type AccessTokenPayload = SetRequired<JwtPayload, "sub" | "exp">;
export type RefreshTokenPayload = SetRequired<JwtPayload, "sub" | "exp" | "jti">;
