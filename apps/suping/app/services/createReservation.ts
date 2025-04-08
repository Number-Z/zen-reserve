"use server";

import { ADMIN_EMAIL, SERVICE_NAME } from "@/app/consts/consts";
import { RESERVATION_STATUS } from "@/app/consts/status";
import { getOptionsServices } from "@/app/services/getOptionsServices";
import { sendEmail, sendEmailForAdmin } from "@/app/services/sendEmail";
import type { IFormInput } from "@/app/types/IFormInput";
import prisma from "@zen-reserve/database";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

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

  // === totalPriceの計算
  let adultPrice = 0;
  // 大人の人数に応じた料金計算
  if (values.customer.adultCount === 1) {
    adultPrice = 10000;
  } else if (
    values.customer.adultCount >= 2 &&
    values.customer.adultCount <= 6
  ) {
    adultPrice = 6000 * values.customer.adultCount;
  } else if (
    values.customer.adultCount >= 7 &&
    values.customer.adultCount <= 10
  ) {
    adultPrice = 5500 * values.customer.adultCount;
  }

  // 子供料金の計算
  const childPrice =
    values.customer.childCount > 0 ? 3000 * values.customer.childCount : 0;

  let subtotalPrice = adultPrice + childPrice;

  // オプション料金の加算
  for (const [optionName, optionValue] of Object.entries(values.options)) {
    const option = optionsServices.find(
      (opt) => opt.Option.name === optionName,
    );
    if (option) {
      if (typeof optionValue === "boolean") {
        if (optionValue) {
          subtotalPrice += option.Option.price;
        }
      } else if (typeof optionValue === "number" && optionValue > 0) {
        subtotalPrice += option.Option.price * optionValue;
      }
    }
  }

  // 消費税10%を加算し、小数点以下を切り捨てた最終価格
  const finalTotalPrice = Math.floor(subtotalPrice * 1.1);
  // === totalPriceの計算ここまで ===

  // オプションの作成データを準備
  const optionReservationsData = Object.entries(values.options)
    .filter(([_, value]) => {
      if (typeof value === "number") {
        return value > 0;
      }
      return value === true;
    })
    .map(([key, value]) => {
      const option = optionsServices.find((opt) => opt.Option.name === key);
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
      totalPrice: finalTotalPrice,
      discount: 0,
      OptionReservation: {
        create: optionReservationsData,
      },
      DiscoveryMethodReservation: {
        create: discoveryMethodsData,
      },
    },
  });

  // 予約者情報の配列
  const customer = [
    { label: "姓", value: values.customer.lastName },
    { label: "名", value: values.customer.firstName },
    { label: "メールアドレス", value: values.customer.email },
    { label: "電話番号", value: values.customer.phoneNumber },
  ];

  // 予約詳細の配列
  const reservationDetails = [
    { label: "予約ID", value: reservation.reservationId.toString() },
    {
      label: "予約日",
      value: format(
        // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
        toZonedTime(values.startDateTime!, "Asia/Tokyo"),
        "yyyy年MM月dd日",
      ),
    },
    {
      label: "予約時間",
      // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
      value: `${format(toZonedTime(values.startDateTime!, "Asia/Tokyo"), "HH:mm")} - ${format(toZonedTime(values.endDateTime!, "Asia/Tokyo"), "HH:mm")}`,
    },
    {
      label: "人数",
      value: `大人 ${values.customer.adultCount}名 子供 ${values.customer.childCount}名`,
    },
    { label: "料金", value: `${finalTotalPrice.toLocaleString()}円` },
  ];

  // オプションの配列
  const options = Object.entries(values.options)
    .map(([key, optionValue]) => {
      const optionService = optionsServices.find(
        (opt) => opt.Option.name === key,
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
        label: optionService.Option.printName,
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
    customer,
    reservationDetails,
    options,
  });

  await sendEmailForAdmin({
    to: ADMIN_EMAIL,
    customer,
    reservationDetails,
    options,
  });
}
