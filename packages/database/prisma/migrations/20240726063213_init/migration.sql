-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "admins" (
    "admin_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
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
CREATE TABLE "options" (
    "option_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT '',
    "print_name" VARCHAR(100) NOT NULL DEFAULT '',
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "limit" INTEGER,
    "display_type" VARCHAR(20) NOT NULL DEFAULT 'input',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "option_services" (
    "serviceId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "option_services_pkey" PRIMARY KEY ("serviceId","optionId")
);

-- CreateTable
CREATE TABLE "reservations" (
    "reservation_id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_date" TIMESTAMPTZ NOT NULL,
    "end_date" TIMESTAMPTZ NOT NULL,
    "participants" INTEGER NOT NULL,
    "other_info" TEXT,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "total_price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "option_reservations" (
    "option_id" INTEGER NOT NULL,
    "reservation_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "option_reservations_pkey" PRIMARY KEY ("reservation_id","option_id")
);

-- CreateTable
CREATE TABLE "discovery_methods" (
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "discovery_methods_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "admins_email_idx" ON "admins"("email");

-- CreateIndex
CREATE INDEX "reservations_user_id_idx" ON "reservations"("user_id");

-- CreateIndex
CREATE INDEX "reservations_service_id_idx" ON "reservations"("service_id");

-- CreateIndex
CREATE INDEX "reservations_start_date_end_date_idx" ON "reservations"("start_date", "end_date");

-- CreateIndex
CREATE INDEX "option_reservations_reservation_id_idx" ON "option_reservations"("reservation_id");

-- CreateIndex
CREATE INDEX "option_reservations_option_id_idx" ON "option_reservations"("option_id");

-- AddForeignKey
ALTER TABLE "option_services" ADD CONSTRAINT "option_services_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "options"("option_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option_services" ADD CONSTRAINT "option_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option_reservations" ADD CONSTRAINT "option_reservations_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("reservation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option_reservations" ADD CONSTRAINT "option_reservations_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("option_id") ON DELETE CASCADE ON UPDATE CASCADE;
