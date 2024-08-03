-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');

-- CreateTable
CREATE TABLE "admins" (
    "admin_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "discovery_methods" (
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "discovery_methods_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "discovery_methods_reservations" (
    "reservation_id" INTEGER NOT NULL,
    "discovery_method_name" TEXT NOT NULL,

    CONSTRAINT "discovery_methods_reservations_pkey" PRIMARY KEY ("reservation_id","discovery_method_name")
);

-- CreateTable
CREATE TABLE "instructors" (
    "instructor_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "instructors_pkey" PRIMARY KEY ("instructor_id")
);

-- CreateTable
CREATE TABLE "options" (
    "option_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT '',
    "print_name" VARCHAR(100) NOT NULL DEFAULT '',
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "stock" INTEGER,
    "limit" INTEGER,
    "display_type" VARCHAR(20) NOT NULL DEFAULT 'input',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "options_reservations" (
    "option_id" INTEGER NOT NULL,
    "reservation_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "options_reservations_pkey" PRIMARY KEY ("reservation_id","option_id")
);

-- CreateTable
CREATE TABLE "options_services" (
    "service_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "options_services_pkey" PRIMARY KEY ("service_id","option_id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "reservation_id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "start_date_time" TIMESTAMPTZ(6) NOT NULL,
    "end_date_time" TIMESTAMPTZ(6) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "adult_count" INTEGER NOT NULL DEFAULT 0,
    "child_count" INTEGER NOT NULL DEFAULT 0,
    "other_info" TEXT,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "total_price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "instructor_id" INTEGER,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "services" (
    "service_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "unavailable_times" (
    "unavailable_time_id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "start_date_time" TIMESTAMPTZ(6) NOT NULL,
    "end_date_time" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "unavailable_times_pkey" PRIMARY KEY ("unavailable_time_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "admins_email_idx" ON "admins"("email");

-- CreateIndex
CREATE INDEX "options_reservations_option_id_idx" ON "options_reservations"("option_id");

-- CreateIndex
CREATE INDEX "options_reservations_reservation_id_idx" ON "options_reservations"("reservation_id");

-- CreateIndex
CREATE INDEX "reservations_service_id_idx" ON "reservations"("service_id");

-- CreateIndex
CREATE INDEX "reservations_start_date_time_end_date_time_idx" ON "reservations"("start_date_time", "end_date_time");

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- CreateIndex
CREATE INDEX "unavailable_times_service_id_idx" ON "unavailable_times"("service_id");

-- CreateIndex
CREATE INDEX "unavailable_times_start_date_time_end_date_time_idx" ON "unavailable_times"("start_date_time", "end_date_time");

-- AddForeignKey
ALTER TABLE "discovery_methods_reservations" ADD CONSTRAINT "discovery_methods_reservations_discovery_method_name_fkey" FOREIGN KEY ("discovery_method_name") REFERENCES "discovery_methods"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discovery_methods_reservations" ADD CONSTRAINT "discovery_methods_reservations_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("reservation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_reservations" ADD CONSTRAINT "options_reservations_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("option_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_reservations" ADD CONSTRAINT "options_reservations_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("reservation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_services" ADD CONSTRAINT "options_services_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("option_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options_services" ADD CONSTRAINT "options_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("instructor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unavailable_times" ADD CONSTRAINT "unavailable_times_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

