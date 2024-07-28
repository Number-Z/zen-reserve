"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { differenceInHours } from "date-fns";
import { useFormContext, useWatch } from "react-hook-form";

export default function Details() {
  const { control } = useFormContext<IFormInput>();

  // useWatch を使用して値の変更を監視
  const totalPrice = useWatch({
    control,
    name: "totalPrice",
  });
  const startDateTime = useWatch({
    control,
    name: "startDateTime",
  });
  const endDateTime = useWatch({
    control,
    name: "endDateTime",
  });

  const totalHours =
    startDateTime == null || endDateTime == null
      ? 4
      : differenceInHours(endDateTime, startDateTime);

  return (
    <div className="px-6 text-right font-semibold text-lg">
      <p>時間: {totalHours}時間</p>
      <p>合計: {totalPrice.toLocaleString()}円</p>
    </div>
  );
}
