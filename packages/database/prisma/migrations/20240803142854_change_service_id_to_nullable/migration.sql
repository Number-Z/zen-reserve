-- DropForeignKey
ALTER TABLE "unavailable_times" DROP CONSTRAINT "unavailable_times_service_id_fkey";

-- AlterTable
ALTER TABLE "unavailable_times" ALTER COLUMN "service_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "unavailable_times" ADD CONSTRAINT "unavailable_times_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE SET NULL ON UPDATE CASCADE;
