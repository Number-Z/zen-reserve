"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { useFormContext } from "react-hook-form";

export default function Customer() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormInput>();

  return (
    <section className="flex flex-col gap-6 px-6">
      <h2 className="font-bold text-gray-900 text-xl">代表者情報入力</h2>
      <div>
        <label htmlFor="lastName" className="text-sm">
          姓
        </label>
        <input
          {...register("customer.lastName")}
          id="lastName"
          className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        />
        {errors.customer?.lastName && (
          <p className="text-red-500 text-sm">
            {errors.customer.lastName?.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="firstName" className="text-sm">
          名
        </label>
        <input
          {...register("customer.firstName")}
          id="firstName"
          className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        />
        {errors.customer?.firstName && (
          <p className="text-red-500 text-sm">
            {errors.customer.firstName?.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-sm">
          メールアドレス
        </label>
        <input
          {...register("customer.email")}
          id="email"
          className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        />
        {errors.customer?.email && (
          <p className="text-red-500 text-sm">
            {errors.customer.email?.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="text-sm">
          電話番号
        </label>
        <input
          {...register("customer.phoneNumber")}
          id="phoneNumber"
          className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        />
        {errors.customer?.phoneNumber && (
          <p className="text-red-500 text-sm">
            {errors.customer.phoneNumber?.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="participants" className="text-sm">
          参加人数
        </label>
        <select
          {...register("customer.participants")}
          id="participants"
          className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          <option defaultValue="0">選択してください</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option
              // biome-ignore lint/suspicious/noArrayIndexKey: 他に値が存在しないため
              key={`participants-${i}`}
              value={i + 1}
            >
              {i + 1}
            </option>
          ))}
        </select>
        {errors.customer?.participants && (
          <p className="text-red-500 text-sm">
            {errors.customer.participants?.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="otherInfo" className="text-sm">
          その他ご要望
        </label>
        <textarea
          {...register("customer.otherInfo")}
          rows={4}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 text-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </section>
  );
}
