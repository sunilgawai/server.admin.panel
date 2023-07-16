-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_kycId_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_submitted_by_userId_fkey`;

-- AlterTable
ALTER TABLE `customer` MODIFY `submitted_by_userId` VARCHAR(191) NULL,
    MODIFY `kycId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_submitted_by_userId_fkey` FOREIGN KEY (`submitted_by_userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_kycId_fkey` FOREIGN KEY (`kycId`) REFERENCES `Kyc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
