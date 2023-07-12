/*
  Warnings:

  - You are about to drop the column `countriesId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `statesId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `citiesId` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `countriesId` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `statesId` on the `customer` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_countriesId_fkey`;

-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_statesId_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_citiesId_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_countriesId_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_statesId_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `countriesId`,
    DROP COLUMN `statesId`,
    ADD COLUMN `countryId` MEDIUMINT UNSIGNED NOT NULL,
    ADD COLUMN `default` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `stateId` MEDIUMINT UNSIGNED NOT NULL,
    MODIFY `customerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `citiesId`,
    DROP COLUMN `countriesId`,
    DROP COLUMN `statesId`,
    ADD COLUMN `cityId` MEDIUMINT UNSIGNED NOT NULL,
    ADD COLUMN `countryId` MEDIUMINT UNSIGNED NOT NULL,
    ADD COLUMN `stateId` MEDIUMINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `addressId` VARCHAR(191) NULL,
    ADD COLUMN `departmentId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Department` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('ACCOUNT', 'SALES') NOT NULL,

    UNIQUE INDEX `Department_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `Cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
