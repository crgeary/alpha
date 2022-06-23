-- CreateEnum
CREATE TYPE "RefreshTokenStatus" AS ENUM ('ACTIVE', 'REVOKED');

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "jwt_id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "status" "RefreshTokenStatus" NOT NULL DEFAULT E'ACTIVE'
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_jwt_id_user_id_key" ON "refresh_tokens"("jwt_id", "user_id");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
