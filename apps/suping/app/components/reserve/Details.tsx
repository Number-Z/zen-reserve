"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { useFormContext, useWatch } from "react-hook-form";

export default function Details() {
  const { control } = useFormContext<IFormInput>();

  // useWatch を使用して値の変更を監視
  const totalPrice = useWatch({
    control,
    name: "totalPrice",
  });

  return (
    <div className="px-6 text-right font-semibold text-lg">
      <p>時間: 2時間</p>
      <p>合計: {totalPrice.toLocaleString()}円</p>
    </div>
  );
}
