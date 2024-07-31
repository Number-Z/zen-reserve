"use client";

import Button from "@/app/components/common/Button";
import Calendar from "@/app/components/reserve/Calendar";
import Customer from "@/app/components/reserve/Customer";
import Details from "@/app/components/reserve/Details";
import DiscoveryMethod from "@/app/components/reserve/DiscoveryMethod";
import Options from "@/app/components/reserve/Options";
import Participants from "@/app/components/reserve/Participants";
import Time from "@/app/components/reserve/Time";
import type { IFormInput } from "@/app/types/IFormInput";
import type {
  DiscoveryMethod as IDiscoveryMethod,
  Option,
  OptionService,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo } from "react";
import { type SubmitHandler, useFormContext, useWatch } from "react-hook-form";

type ReservationFormProps = {
  minDate: Date;
  options: (OptionService & {
    option: Option;
  })[];
  discoveryMethods: IDiscoveryMethod[];
};

const MemoizedCalendar = memo(Calendar);
const MemoizedTime = memo(Time);
const MemoizedParticipants = memo(Participants);
const MemoizedOptions = memo(Options);
const MemoizedCustomer = memo(Customer);
const MemoizedDiscoveryMethod = memo(DiscoveryMethod);
const MemoizedDetails = memo(Details);

export default function ReservationForm({
  minDate,
  options,
  discoveryMethods,
}: ReservationFormProps) {
  const methods = useFormContext<IFormInput>();
  const router = useRouter();

  // 価格計算
  const memoizedCalculateTotalPrice = useMemo(() => {
    return (
      selectedOptions: IFormInput["options"],
      availableOptions: (OptionService & {
        option: Option;
      })[],
      adultCount: number,
      childCount: number,
    ): number => {
      let totalPrice = 5500 * adultCount + 3000 * childCount;

      for (const [optionName, optionValue] of Object.entries(selectedOptions)) {
        const option = availableOptions.find(
          (o) => o.option.name === optionName,
        );
        if (option) {
          if (typeof optionValue === "boolean") {
            if (optionValue) {
              totalPrice += option.option.price;
            }
          } else if (typeof optionValue === "number") {
            if (optionValue > 0) {
              totalPrice += option.option.price * optionValue;
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
  const adultCount = useWatch({
    control: methods.control,
    name: "customer.adultCount",
  });
  const childCount = useWatch({
    control: methods.control,
    name: "customer.childCount",
  });
  useEffect(() => {
    const totalPrice = memoizedCalculateTotalPrice(
      watchedOptions,
      options,
      adultCount,
      childCount,
    );
    methods.setValue("totalPrice", totalPrice, { shouldValidate: true });
  }, [
    memoizedCalculateTotalPrice,
    watchedOptions,
    options,
    adultCount,
    childCount,
    methods.setValue,
  ]);

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
        <MemoizedParticipants />
        <MemoizedOptions options={options} />
        <MemoizedCustomer />
        <MemoizedDiscoveryMethod discoveryMethods={discoveryMethods} />
        <MemoizedDetails />
        <Button type="submit">次へ</Button>
      </div>
    </form>
  );
}
