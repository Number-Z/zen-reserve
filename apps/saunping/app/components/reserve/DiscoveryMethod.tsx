"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import type { DiscoveryMethod as IDiscoveryMethod } from "@prisma/client";
import { useFormContext } from "react-hook-form";

type DiscoveryMethodProps = {
  discoveryMethods: IDiscoveryMethod[];
};

export default function DiscoveryMethod({
  discoveryMethods,
}: DiscoveryMethodProps) {
  const { register } = useFormContext<IFormInput>();

  return (
    <section className="flex flex-col gap-6 px-6">
      <h2 className="font-bold text-gray-900 text-xl">
        何を見て予約してくれましたか？
      </h2>
      <div className="flex flex-col">
        {discoveryMethods.map((discoveryMethod) => (
          <div className="mb-4 flex items-center" key={discoveryMethod.name}>
            <input
              id={discoveryMethod.name}
              type="checkbox"
              value={discoveryMethod.name}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
              {...register("discoveryMethods")}
            />
            <label
              htmlFor={discoveryMethod.name}
              className="ml-2 text-gray-900 text-sm"
            >
              {discoveryMethod.name}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
