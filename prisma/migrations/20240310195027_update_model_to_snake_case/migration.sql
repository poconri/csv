/*
  Warnings:

  - You are about to drop the `ResourceAccommodation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ResourceAccommodation`;

-- CreateTable
CREATE TABLE `resource_accommodations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `row_id` INTEGER NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `advertiser` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `is_renovated` BOOLEAN NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `price_per_meter` DOUBLE NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `square_meters` INTEGER NOT NULL,
    `bedroom_amount` INTEGER NOT NULL,
    `bathroom_amount` INTEGER NOT NULL,
    `has_parking` BOOLEAN NOT NULL,
    `is_second_hand` BOOLEAN NOT NULL,
    `built_in_wardrobes` BOOLEAN NOT NULL,
    `built_year` INTEGER NULL,
    `is_furnished` BOOLEAN NOT NULL,
    `individual_heating_type` VARCHAR(191) NOT NULL,
    `energy_certification` VARCHAR(191) NULL,
    `floor` INTEGER NULL,
    `has_exterior_view` BOOLEAN NOT NULL,
    `has_interior_view` BOOLEAN NOT NULL,
    `has_elevator` BOOLEAN NOT NULL,
    `date` DATETIME(3) NULL,
    `street` VARCHAR(191) NULL,
    `neighborhood` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `has_terrace` BOOLEAN NOT NULL,
    `storage_room` VARCHAR(191) NOT NULL,
    `is_kitchen_equipped` BOOLEAN NOT NULL,
    `has_air_conditioning` BOOLEAN NOT NULL,
    `has_pool_access` BOOLEAN NOT NULL,
    `has_garden` BOOLEAN NOT NULL,
    `useful_square_meters` INTEGER NULL,
    `is_accessible` BOOLEAN NOT NULL,
    `floors` INTEGER NULL,
    `is_pet_friendly` BOOLEAN NOT NULL,
    `has_balcony` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
