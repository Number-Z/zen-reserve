"use server";

import { RESERVATION_STATUS } from "@/consts/status";
import type { ReservationSchemaType } from "@/schemas/reservation";
import getOptionsServices from "@/services/getOptionsServices";
import { sendEmail } from "@/services/sendEmail";
import prisma from "@zen-reserve/database";
import { format } from "date-fns";
import { redirect } from "next/navigation";

function shouldSendEmail(currentStatus: string, updatedStatus: string) {
  return (
    (currentStatus === RESERVATION_STATUS.PENDING &&
      updatedStatus === RESERVATION_STATUS.CONFIRMED) ||
    (currentStatus !== RESERVATION_STATUS.CANCELED &&
      updatedStatus === RESERVATION_STATUS.CANCELED)
  );
}

export async function updateReservation(reservation: ReservationSchemaType) {
  // 現在の予約情報を取得
  const currentReservation = await prisma.reservation.findUnique({
    where: { reservationId: reservation.reservationId },
    include: { optionReservations: { include: { option: true } } },
  });

  if (!currentReservation) {
    throw new Error(
      `Reservation with ID ${reservation.reservationId} not found`,
    );
  }

  // オプションを取得
  const optionsServices = await getOptionsServices(reservation.serviceId);

  // オプションの更新データを準備
  const optionReservationsData = Object.entries(reservation.options)
    .filter(([_, value]) => {
      if (typeof value === "number") {
        return value > 0;
      }
      return value === true;
    })
    .map(([key, value]) => {
      const option = optionsServices.find((opt) => opt.name === key);
      if (!option) {
        throw new Error(`Option with name ${key} not found`);
      }
      return {
        optionId: option.optionId,
        quantity: typeof value === "number" ? value : 1, // booleanの場合は1とする
      };
    });

  const updatedReservation = await prisma.reservation.update({
    where: { reservationId: reservation.reservationId },
    data: {
      startDateTime: reservation.startDateTime,
      endDateTime: reservation.endDateTime,
      firstName: reservation.customer.firstName,
      lastName: reservation.customer.lastName,
      email: reservation.customer.email,
      phoneNumber: reservation.customer.phoneNumber,
      adultCount: reservation.customer.adultCount,
      childCount: reservation.customer.childCount,
      otherInfo: reservation.customer.otherInfo,
      status:
        reservation.status as (typeof RESERVATION_STATUS)[keyof typeof RESERVATION_STATUS],
      // totalPrice: reservation.totalPrice,  // 画面上でdiscountを差し引いて表示するのでtotalPrice自体は更新しない
      instructorId:
        reservation.instructorId === 0 ? null : reservation.instructorId,
      discount: reservation.discount,
      optionReservations: {
        deleteMany: {}, // 既存のオプションをすべて削除
        create: optionReservationsData, // オプションを新規作成
      },
      // discoveryMethods: {},  // 予約経路チェックボックスは閲覧のみ（disabled）にしているので更新しない
    },
    include: {
      optionReservations: {
        include: {
          option: true,
        },
      },
      service: true,
    },
  });

  // 予約詳細の配列
  const reservationDetails = [
    { label: "予約ID", value: updatedReservation.reservationId.toString() },
    {
      label: "予約日",
      value: format(updatedReservation.startDateTime, "yyyy年MM月dd日"),
    },
    {
      label: "予約時間",
      value: `${format(updatedReservation.startDateTime, "HH:mm")} - ${format(updatedReservation.endDateTime, "HH:mm")}`,
    },
    { label: "人数", value: `${updatedReservation.adultCount}名` },
    {
      label: "料金",
      value: `${(updatedReservation.totalPrice - updatedReservation.discount).toLocaleString()}円`,
    },
  ];

  // オプションの配列
  const options = optionsServices.map((optionService) => {
    const optionReservation = updatedReservation.optionReservations.find(
      (or) => or.optionId === optionService.optionId,
    );

    let displayValue: string;
    if (optionService.displayType === "toggle") {
      displayValue = optionReservation ? "あり" : "なし";
    } else if (optionService.displayType === "select") {
      displayValue = optionReservation
        ? `${optionReservation.quantity}個`
        : "なし";
    } else {
      displayValue = "なし";
    }

    return {
      label: optionService.printName,
      value: displayValue,
    };
  });

  // その他ご要望を追加
  options.push({
    label: "その他ご要望",
    value: updatedReservation.otherInfo ?? "なし",
  });

  // from の決定
  let from = "noreply@reserve.z-en.jp";
  switch (updatedReservation.service.name) {
    case "SAUNPING":
      from = "noreply@reserve.saunping.jp";
      break;
    case "SUPING":
      from = "noreply@reserve.suping.jp";
      break;
  }

  // 予約リクエスト->確定時、キャンセル時メール送信
  if (shouldSendEmail(currentReservation.status, updatedReservation.status)) {
    await sendEmail({
      from,
      to: updatedReservation.email,
      status: updatedReservation.status,
      serviceName: updatedReservation.service.name,
      reservationDetails: reservationDetails,
      options: options,
    });
  }

  redirect("/dashboard/reservations");
}
