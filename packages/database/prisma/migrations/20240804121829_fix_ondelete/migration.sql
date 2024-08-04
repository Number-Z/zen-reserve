/*
  Warnings:

  - You are about to drop the column `instructor_id` on the `reservations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "discovery_methods_reservations" DROP CONSTRAINT "discovery_methods_reservations_discovery_method_name_fkey";

-- DropForeignKey
ALTER TABLE "options_reservations" DROP CONSTRAINT "options_reservations_option_id_fkey";

-- DropForeignKey
ALTER TABLE "options_services" DROP CONSTRAINT "options_services_option_id_fkey";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_instructor_id_fkey";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_service_id_fkey";

-- DropForeignKey
ALTER TABLE "unavailable_date_times" DROP CONSTRAINT "unavailable_date_times_service_id_fkey";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "instructor_id",
ALTER COLUMN "service_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "instructors_reservations" (
    "instructor_id" INTEGER NOT NULL,
    "reservation_id" INTEGER NOT NULL,

    CONSTRAINT "instructors_reservations_pkey" PRIMARY KEY ("instructor_id","reservation_id")
);

-- AddForeignKey
ALTER TABLE "discovery_methods_reservations" ADD CONSTRAINT "discovery_methods_reservations_discovery_method_name_fkey" FOREIGN KEY ("discovery_method_name") REFERENCES "discovery_methods"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructors_reservations" ADD CONSTRAINT "instructors_reservations_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("instructor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructors_reservations" ADD CONSTRAINT "instructors_reservations_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("reservation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_reservations" ADD CONSTRAINT "options_reservations_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("option_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_services" ADD CONSTRAINT "options_services_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("option_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unavailable_date_times" ADD CONSTRAINT "unavailable_date_times_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE CASCADE ON UPDATE CASCADE;
