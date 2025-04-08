"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { differenceInHours } from "date-fns";
import { useFormContext } from "react-hook-form";

export default function Details() {
  const { control } = useFormContext<IFormInput>();
  const { watch } = useFormContext<IFormInput>();
  const startDateTime = watch("startDateTime");
  const endDateTime = watch("endDateTime");
  // subTotalPriceとtotalPriceを監視
  const subTotalPrice = watch("subTotalPrice");
  const totalPrice = watch("totalPrice");

  const totalHours =
    startDateTime == null || endDateTime == null
      ? 0
      : differenceInHours(endDateTime, startDateTime);

  return (
    <div className="px-6 font-semibold text-lg">
      <dl>
        <div className="flex justify-between">
          <dt className="text-gray-500">利用時間</dt>
          <dd className="text-gray-800">{totalHours}時間</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">小計（税抜）</dt>
          <dd className="text-gray-800">{subTotalPrice?.toLocaleString()}円</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-bold text-gray-500">合計（税込）</dt>
          <dd className="font-bold text-gray-800">
            {totalPrice?.toLocaleString()}円
          </dd>
        </div>
      </dl>
    </div>
  );
}
