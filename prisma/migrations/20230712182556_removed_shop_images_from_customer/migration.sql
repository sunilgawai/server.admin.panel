/*
  Warnings:

  - You are about to drop the column `shopImagesId` on the `customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_shopImagesId_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `shopImagesId`;
