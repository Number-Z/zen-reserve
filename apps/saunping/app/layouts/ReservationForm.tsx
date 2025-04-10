"use client";

import Button from "@/app/components/common/Button";
import Calendar from "@/app/components/reserve/Calendar";
import Customer from "@/app/components/reserve/Customer";
import Details from "@/app/components/reserve/Details";
import DiscoveryMethod from "@/app/components/reserve/DiscoveryMethod";
import Options from "@/app/components/reserve/Options";
import Participants from "@/app/components/reserve/Participants";
import Time from "@/app/components/reserve/Time";
import type { OptionsServicesType } from "@/app/services/getOptionsServices";
import type { UnavailableDateTimeType } from "@/app/services/getUnavailableDateTimes";
import type { IFormInput } from "@/app/types/IFormInput";
import type { DiscoveryMethod as IDiscoveryMethod } from "@prisma/client";
import { addHours } from "date-fns";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo } from "react";
import { type SubmitHandler, useFormContext, useWatch } from "react-hook-form";

type ReservationFormProps = {
  minDate: Date;
  optionsServices: OptionsServicesType;
  discoveryMethods: IDiscoveryMethod[];
  unavailableDateTimes: UnavailableDateTimeType;
};

const MemoizedCalendar = memo(Calendar);
const MemoizedTime = memo(Time);
const MemoizedOptions = memo(Options);
const MemoizedCustomer = memo(Customer);
const MemoizedParticipants = memo(Participants);
const MemoizedDiscoveryMethod = memo(DiscoveryMethod);
const MemoizedDetails = memo(Details);

export default function ReservationForm({
  minDate,
  optionsServices,
  discoveryMethods,
  unavailableDateTimes,
}: ReservationFormProps) {
  const { control, handleSubmit, watch, setValue } =
    useFormContext<IFormInput>();
  const router = useRouter();

  // 価格計算
  const memoizedCalculateTotalPrice = useMemo(() => {
    return (
      selectedOptions: IFormInput["options"],
      availableOptions: OptionsServicesType,
      adultCount: number | undefined,
      childCount: number | undefined,
    ): { subtotal: number; total: number } => {
      let subtotalPrice = 5000;

      // 大人の人数料金の加算 (adultCountが数値で、かつ1より大きい場合のみ)
      if (typeof adultCount === "number" && adultCount > 0) {
        subtotalPrice += adultCount * 1500;
      }

      // 子供料金の加算 (childCountが数値の場合のみ)
      if (typeof childCount === "number" && childCount > 0) {
        subtotalPrice += childCount * 500;
      }

      for (const [optionName, optionValue] of Object.entries(selectedOptions)) {
        const option = availableOptions.find(
          (o) => o.Option.name === optionName,
        );
        if (option) {
          if (typeof optionValue === "boolean") {
            if (optionValue) {
              subtotalPrice += option.Option.price;
            }
          } else if (typeof optionValue === "number") {
            if (optionValue > 0) {
              subtotalPrice += option.Option.price * optionValue;
            }
          }
        }
      }

      // 消費税10%を加算し、小数点以下を切り捨て
      const total = Math.floor(subtotalPrice * 1.1);
      return { subtotal: subtotalPrice, total };
    };
  }, []);

  const watchedOptions = useWatch({
    control,
    name: "options",
  });
  const watchedAdultCount = useWatch({
    control,
    name: "customer.adultCount",
  });
  const watchedChildCount = useWatch({
    control,
    name: "customer.childCount",
  });

  useEffect(() => {
    const prices = memoizedCalculateTotalPrice(
      watchedOptions,
      optionsServices,
      watchedAdultCount,
      watchedChildCount,
    );
    setValue("subTotalPrice", prices.subtotal, { shouldValidate: false });
    setValue("totalPrice", prices.total, { shouldValidate: true });
  }, [
    watchedOptions,
    optionsServices,
    watchedAdultCount,
    watchedChildCount,
    memoizedCalculateTotalPrice,
    setValue,
  ]);

  // BBQセットのオプションを追加した場合、利用時間を+2時間する
  const startDateTime = watch("startDateTime");
  useEffect(() => {
    if (!setValue) return;
    if (startDateTime == null) return;

    if (watchedOptions?.bbqSet === true) {
      setValue("endDateTime", addHours(startDateTime, 3 + 2));
    } else {
      setValue("endDateTime", addHours(startDateTime, 3));
    }
  }, [startDateTime, watchedOptions, setValue]);

  const onSubmit = useCallback<SubmitHandler<IFormInput>>(() => {
    router.push("/confirm");
  }, [router]);

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-1 flex justify-center">
        <MemoizedCalendar minDate={minDate} />
      </div>
      <div className="col-span-1 mx-auto flex w-full max-w-4xl flex-col gap-8 lg:col-span-2">
        <MemoizedTime unavailableDateTimes={unavailableDateTimes} />
        <MemoizedParticipants />
        <MemoizedOptions optionsServices={optionsServices} />
        <MemoizedCustomer />
        <MemoizedDiscoveryMethod discoveryMethods={discoveryMethods} />
        <MemoizedDetails />
        <Button type="submit">次へ</Button>
      </div>
    </form>
  );
}
