/*
  Warnings:

  - You are about to alter the column `name` on the `department` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE `department` MODIFY `name` VARCHAR(25) NOT NULL;
