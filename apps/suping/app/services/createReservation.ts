"use server";

import { ADMIN_EMAIL, SERVICE_NAME } from "@/app/consts/consts";
import { RESERVATION_STATUS } from "@/app/consts/status";
import { getOptionsServices } from "@/app/services/getOptionsServices";
import { sendEmail, sendEmailForAdmin } from "@/app/services/sendEmail";
import type { IFormInput } from "@/app/types/IFormInput";
import prisma from "@zen-reserve/database";
import { format } from "date-fns";

export async function createReservation(values: IFormInput, _: FormData) {
  // サービスを名前で検索
  const service = await prisma.service.findUnique({
    where: { name: SERVICE_NAME },
  });

  if (!service) {
    throw new Error(`Service with name ${SERVICE_NAME} not found`);
  }

  // オプションを取得
  const optionsServices = await getOptionsServices();

  // totalPriceの計算
  let totalPrice =
    5500 * values.customer.adultCount + 3000 * values.customer.childCount;

  for (const [optionName, optionValue] of Object.entries(values.options)) {
    const option = optionsServices.find(
      (opt) => opt.option.name === optionName,
    );
    if (option) {
      if (typeof optionValue === "boolean") {
        if (optionValue) {
          totalPrice += option.option.price;
        }
      } else if (typeof optionValue === "number" && optionValue > 0) {
        totalPrice += option.option.price * optionValue;
      }
    }
  }

  // オプションの作成データを準備
  const optionReservationsData = Object.entries(values.options)
    .filter(([_, value]) => {
      if (typeof value === "number") {
        return value > 0;
      }
      return value === true;
    })
    .map(([key, value]) => {
      const option = optionsServices.find((opt) => opt.option.name === key);
      if (!option) {
        throw new Error(`Option with name ${key} not found`);
      }
      return {
        optionId: option.optionId,
        quantity: typeof value === "number" ? value : 1, // booleanの場合は1とする
      };
    });

  // discoveryMethodsの作成データを準備
  const discoveryMethodsData = values.discoveryMethods.map((methodName) => ({
    discoveryMethodName: methodName,
  }));

  const reservation = await prisma.reservation.create({
    data: {
      serviceId: service.serviceId,
      // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
      startDateTime: values.startDateTime!,
      // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
      endDateTime: values.endDateTime!,
      firstName: values.customer.firstName,
      lastName: values.customer.lastName,
      email: values.customer.email,
      phoneNumber: values.customer.phoneNumber,
      adultCount: values.customer.adultCount,
      childCount: values.customer.childCount,
      otherInfo: values.customer.otherInfo,
      status: RESERVATION_STATUS.PENDING,
      totalPrice: totalPrice,
      discount: 0,
      optionReservations: {
        create: optionReservationsData,
      },
      discoveryMethods: {
        create: discoveryMethodsData,
      },
    },
  });

  // 予約詳細の配列
  const reservationDetails = [
    { label: "予約ID", value: reservation.reservationId.toString() },
    {
      label: "予約日",
      // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
      value: format(values.startDateTime!, "yyyy年MM月dd日"),
    },
    {
      label: "予約時間",
      // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
      value: `${format(values.startDateTime!, "HH:mm")} - ${format(values.endDateTime!, "HH:mm")}`,
    },
    {
      label: "人数",
      value: `大人 ${values.customer.adultCount}名 子供 ${values.customer.childCount}名`,
    },
    { label: "料金", value: `${totalPrice.toLocaleString()}円` },
  ];

  // オプションの配列
  const options = Object.entries(values.options)
    .map(([key, optionValue]) => {
      const optionService = optionsServices.find(
        (opt) => opt.option.name === key,
      );
      if (!optionService) {
        // オプションが見つからない場合はスキップ
        return null;
      }

      let displayValue: string;
      if (typeof optionValue === "boolean") {
        displayValue = optionValue ? "あり" : "なし";
      } else if (typeof optionValue === "number") {
        displayValue = optionValue > 0 ? `${optionValue}個` : "なし";
      } else {
        displayValue = "なし";
      }

      return {
        label: optionService.option.printName,
        value: displayValue,
      };
    })
    .filter(
      (option): option is { label: string; value: string } => option !== null,
    );

  // その他ご要望を追加
  options.push({
    label: "その他ご要望",
    value: values.customer.otherInfo ?? "なし",
  });

  await sendEmail({
    to: values.customer.email,
    reservationDetails: reservationDetails,
    options,
  });

  await sendEmailForAdmin({
    to: ADMIN_EMAIL,
    reservationDetails: reservationDetails,
    options,
  });
}
