-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allow_show_on_signage" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allow_use_in_booth" BOOLEAN NOT NULL DEFAULT true;
