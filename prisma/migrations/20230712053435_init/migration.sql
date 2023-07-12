-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `role` ENUM('SuperAdmin', 'Admin', 'User') NOT NULL DEFAULT 'User',

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kyc` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('PANCARD', 'ADHARCARD', 'GST') NOT NULL DEFAULT 'PANCARD',
    `status` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Kyc_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `countriesId` MEDIUMINT UNSIGNED NOT NULL,
    `statesId` MEDIUMINT UNSIGNED NOT NULL,
    `citiesId` MEDIUMINT UNSIGNED NOT NULL,
    `shopId` VARCHAR(191) NOT NULL,
    `shopImagesId` VARCHAR(191) NOT NULL,
    `submitted_by_userId` VARCHAR(191) NOT NULL,
    `kycId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customer_id_key`(`id`),
    UNIQUE INDEX `Customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shop` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `shopImagesId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Shop_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopImages` (
    `id` VARCHAR(191) NOT NULL,
    `image_1` VARCHAR(191) NOT NULL,
    `image_2` VARCHAR(191) NULL,
    `image_3` VARCHAR(191) NULL,
    `image_4` VARCHAR(191) NULL,

    UNIQUE INDEX `ShopImages_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `countriesId` MEDIUMINT UNSIGNED NOT NULL,
    `statesId` MEDIUMINT UNSIGNED NOT NULL,
    `citiesId` MEDIUMINT UNSIGNED NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `lattitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Address_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cities` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `state_id` MEDIUMINT UNSIGNED NOT NULL,
    `state_code` VARCHAR(255) NOT NULL,
    `country_id` MEDIUMINT UNSIGNED NOT NULL,
    `country_code` CHAR(2) NOT NULL,
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT '2014-01-01 06:31:01',
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `flag` BOOLEAN NOT NULL DEFAULT true,
    `wikiDataId` VARCHAR(255) NULL,

    INDEX `cities_test_ibfk_1`(`state_id`),
    INDEX `cities_test_ibfk_2`(`country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Countries` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `iso3` CHAR(3) NULL,
    `numeric_code` CHAR(3) NULL,
    `iso2` CHAR(2) NULL,
    `phonecode` VARCHAR(255) NULL,
    `capital` VARCHAR(255) NULL,
    `currency` VARCHAR(255) NULL,
    `currency_name` VARCHAR(255) NULL,
    `currency_symbol` VARCHAR(255) NULL,
    `tld` VARCHAR(255) NULL,
    `native` VARCHAR(255) NULL,
    `region` VARCHAR(255) NULL,
    `subregion` VARCHAR(255) NULL,
    `timezones` TEXT NULL,
    `translations` TEXT NULL,
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(11, 8) NULL,
    `emoji` VARCHAR(191) NULL,
    `emojiU` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `flag` BOOLEAN NOT NULL DEFAULT true,
    `wikiDataId` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `States` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `country_id` MEDIUMINT UNSIGNED NOT NULL,
    `country_code` CHAR(2) NOT NULL,
    `fips_code` VARCHAR(255) NULL,
    `iso2` VARCHAR(255) NULL,
    `type` VARCHAR(191) NULL,
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(11, 8) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `flag` BOOLEAN NOT NULL DEFAULT true,
    `wikiDataId` VARCHAR(255) NULL,

    INDEX `country_region`(`country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_countriesId_fkey` FOREIGN KEY (`countriesId`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_statesId_fkey` FOREIGN KEY (`statesId`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_citiesId_fkey` FOREIGN KEY (`citiesId`) REFERENCES `Cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_shopImagesId_fkey` FOREIGN KEY (`shopImagesId`) REFERENCES `ShopImages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_submitted_by_userId_fkey` FOREIGN KEY (`submitted_by_userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_kycId_fkey` FOREIGN KEY (`kycId`) REFERENCES `Kyc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_shopImagesId_fkey` FOREIGN KEY (`shopImagesId`) REFERENCES `ShopImages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_countriesId_fkey` FOREIGN KEY (`countriesId`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_statesId_fkey` FOREIGN KEY (`statesId`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_citiesId_fkey` FOREIGN KEY (`citiesId`) REFERENCES `Cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cities` ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `States`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Cities` ADD CONSTRAINT `cities_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `States` ADD CONSTRAINT `country_region_final` FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
