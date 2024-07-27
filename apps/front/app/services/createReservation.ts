"use server";

import { RESERVATION_STATUS } from "@/app/consts/status";
import { getOptionsServices } from "@/app/services/getOptionsServices";
import type { IFormInput } from "@/app/types/IFormInput";
import prisma from "@zen-reserve/database";

export async function createReservation(values: IFormInput, _: FormData) {
  // サービスを名前で検索
  const service = await prisma.service.findUnique({
    where: { name: values.serviceName },
  });

  if (!service) {
    throw new Error(`Service with name ${values.serviceName} not found`);
  }

  // オプションを取得
  const optionsServices = await getOptionsServices({
    serviceName: values.serviceName,
  });

  // totalPriceの計算
  let totalPrice = 5000; // 基本料金
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
      participants: values.customer.participants,
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

  return reservation.reservationId;
}
