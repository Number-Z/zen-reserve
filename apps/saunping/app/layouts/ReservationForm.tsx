"use client";

import Button from "@/app/components/common/Button";
import Calendar from "@/app/components/reserve/Calendar";
import Customer from "@/app/components/reserve/Customer";
import Details from "@/app/components/reserve/Details";
import DiscoveryMethod from "@/app/components/reserve/DiscoveryMethod";
import Options from "@/app/components/reserve/Options";
import Time from "@/app/components/reserve/Time";
import type { OptionsServicesType } from "@/app/services/getOptionsServices";
import type { IFormInput } from "@/app/types/IFormInput";
import type {
  DiscoveryMethod as IDiscoveryMethod,
  Option,
  OptionService,
} from "@prisma/client";
import { addHours } from "date-fns";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo } from "react";
import { type SubmitHandler, useFormContext, useWatch } from "react-hook-form";

type ReservationFormProps = {
  minDate: Date;
  optionsServices: OptionsServicesType;
  discoveryMethods: IDiscoveryMethod[];
};

const MemoizedCalendar = memo(Calendar);
const MemoizedTime = memo(Time);
const MemoizedOptions = memo(Options);
const MemoizedCustomer = memo(Customer);
const MemoizedDiscoveryMethod = memo(DiscoveryMethod);
const MemoizedDetails = memo(Details);

export default function ReservationForm({
  minDate,
  optionsServices,
  discoveryMethods,
}: ReservationFormProps) {
  const methods = useFormContext<IFormInput>();
  const router = useRouter();

  // 価格計算
  const memoizedCalculateTotalPrice = useMemo(() => {
    return (
      selectedOptions: IFormInput["options"],
      availableOptions: OptionsServicesType,
    ): number => {
      let totalPrice = 5000;

      for (const [optionName, optionValue] of Object.entries(selectedOptions)) {
        const option = availableOptions.find(
          (o) => o.Option.name === optionName,
        );
        if (option) {
          if (typeof optionValue === "boolean") {
            if (optionValue) {
              totalPrice += option.Option.price;
            }
          } else if (typeof optionValue === "number") {
            if (optionValue > 0) {
              totalPrice += option.Option.price * optionValue;
            }
          }
        }
      }

      return totalPrice;
    };
  }, []);

  const watchedOptions = useWatch({
    control: methods.control,
    name: "options",
  });
  useEffect(() => {
    const totalPrice = memoizedCalculateTotalPrice(
      watchedOptions,
      optionsServices,
    );
    methods.setValue("totalPrice", totalPrice, { shouldValidate: true });
  }, [
    watchedOptions,
    optionsServices,
    memoizedCalculateTotalPrice,
    methods.setValue,
  ]);

  // BBQセットのオプションを追加した場合、利用時間を6時間にする
  const startDateTime = methods.watch("startDateTime");
  useEffect(() => {
    if (!methods.setValue) return;
    if (startDateTime == null) return;

    if (watchedOptions.bbqSet === true) {
      methods.setValue("endDateTime", addHours(startDateTime, 6));
    } else {
      methods.setValue("endDateTime", addHours(startDateTime, 4));
    }
  }, [startDateTime, watchedOptions.bbqSet, methods.setValue]);

  const onSubmit = useCallback<SubmitHandler<IFormInput>>(() => {
    router.push("/confirm");
  }, [router]);

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-3"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <div className="col-span-1 flex justify-center">
        <MemoizedCalendar minDate={minDate} />
      </div>
      <div className="col-span-1 mx-auto flex w-full max-w-4xl flex-col gap-8 lg:col-span-2">
        <MemoizedTime />
        <MemoizedOptions optionsServices={optionsServices} />
        <MemoizedCustomer />
        <MemoizedDiscoveryMethod discoveryMethods={discoveryMethods} />
        <MemoizedDetails />
        <Button type="submit">次へ</Button>
      </div>
    </form>
  );
}
