-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_shopId_fkey`;

-- DropForeignKey
ALTER TABLE `shop` DROP FOREIGN KEY `Shop_shopImagesId_fkey`;

-- AlterTable
ALTER TABLE `customer` MODIFY `shopId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `shop` MODIFY `shopImagesId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_shopImagesId_fkey` FOREIGN KEY (`shopImagesId`) REFERENCES `ShopImages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
