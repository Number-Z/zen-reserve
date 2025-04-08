"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { useFormContext } from "react-hook-form";

export default function Participants() {
  // Memoizedを除去
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormInput>();

  return (
    <section className="flex flex-col gap-6 px-6">
      <h2 className="font-bold text-gray-900 text-xl">人数入力</h2>
      <div>
        <label htmlFor="adultCount" className="text-sm">
          大人（中学生以上）
        </label>
        <select
          {...register("customer.adultCount", {
            valueAsNumber: true,
          })}
          id="adultCount"
          className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={`adultCount-${i + 1}`} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        {errors.customer?.adultCount && (
          <p className="text-red-500 text-sm">
            {errors.customer.adultCount?.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="childCount" className="text-sm">
          子供（中学生未満）
        </label>
        <select
          {...register("customer.childCount", {
            valueAsNumber: true,
          })}
          id="childCount"
          className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          <option value="0">0</option>
          {/* saunpingは子供の人数制限は設けないが、一旦supingに合わせる */}
          {Array.from({ length: 5 }, (_, i) => (
            <option key={`childCount-${i + 1}`} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        {errors.customer?.childCount && (
          <p className="text-red-500 text-sm">
            {errors.customer.childCount?.message}
          </p>
        )}
      </div>
    </section>
  );
}
