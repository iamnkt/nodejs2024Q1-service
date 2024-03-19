-- AlterTable
ALTER TABLE "User" ALTER COLUMN "version" DROP DEFAULT;
DROP SEQUENCE "user_version_seq";
