/*
  Warnings:

  - You are about to drop the `unavailable_times` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "unavailable_times" DROP CONSTRAINT "unavailable_times_service_id_fkey";

-- DropTable
DROP TABLE "unavailable_times";

-- CreateTable
CREATE TABLE "unavailable_date_times" (
    "unavailable_date_time_id" SERIAL NOT NULL,
    "service_id" INTEGER,
    "start_date_time" TIMESTAMPTZ(6) NOT NULL,
    "end_date_time" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "unavailable_date_times_pkey" PRIMARY KEY ("unavailable_date_time_id")
);

-- CreateIndex
CREATE INDEX "unavailable_date_times_service_id_idx" ON "unavailable_date_times"("service_id");

-- CreateIndex
CREATE INDEX "unavailable_date_times_start_date_time_end_date_time_idx" ON "unavailable_date_times"("start_date_time", "end_date_time");

-- AddForeignKey
ALTER TABLE "unavailable_date_times" ADD CONSTRAINT "unavailable_date_times_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE SET NULL ON UPDATE CASCADE;
