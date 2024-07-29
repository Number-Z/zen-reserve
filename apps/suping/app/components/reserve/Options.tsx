import type { Option, OptionService } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type OptionsProps = {
  options: (OptionService & {
    option: Option;
  })[];
};

export default function Options({ options }: OptionsProps) {
  const { register } = useFormContext();

  const [optionCount, setOptionCount] = useState<
    { optionId: number; count: number }[]
  >([]);

  const startDateTime = useWatch({
    name: "startDateTime",
  });

  useEffect(() => {
    if (!startDateTime) return;
    const fetchOptionsCount = async () => {
      const res = await fetch(
        `/api/options?date=${encodeURIComponent(startDateTime.toISOString())}`,
        {
          cache: "no-cache",
        },
      );
      const { options } = await res.json();
      setOptionCount(options);
    };

    fetchOptionsCount();
  }, [startDateTime]);

  const getAvailableOptions = useCallback(
    (optionId: number, stock: number | null, limit: number | null) => {
      const reservedCount =
        optionCount.find((option) => option.optionId === optionId)?.count || 0;
      const availableStock =
        stock !== null
          ? Math.max(stock - reservedCount, 0)
          : Number.POSITIVE_INFINITY;
      const maxLimit = limit !== null ? limit : 10;
      return Math.min(availableStock, maxLimit);
    },
    [optionCount],
  );

  return (
    <section className="flex flex-col gap-6 px-6">
      <h2 className="font-bold text-gray-900 text-xl">オプション選択</h2>
      {options.map((option) => {
        const availableOptions = getAvailableOptions(
          option.optionId,
          option.option.stock,
          option.option.limit,
        );

        return (
          <div key={option.optionId} className="w-full">
            {option.option.displayType === "select" ? (
              <>
                <label htmlFor={option.option.name}>
                  <span className="text-sm">{option.option.printName}</span>
                  <span className="float-right text-sm">
                    +{option.option.price.toLocaleString()}円
                  </span>
                </label>
                <select
                  {...register(`options.${option.option.name}`, {
                    valueAsNumber: true,
                  })}
                  id={option.option.name}
                  className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                >
                  <option value="0">0</option>
                  {Array.from({ length: availableOptions }, (_, i) => (
                    <option key={`${option.optionId}-${i}`} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </>
            ) : option.option.displayType === "checkbox" ? (
              <>
                <label
                  htmlFor={option.option.name}
                  className="inline-flex cursor-pointer items-center"
                >
                  <input
                    id={option.option.name}
                    type="checkbox"
                    {...register(`options.${option.option.name}`)}
                    className="peer sr-only"
                    disabled={availableOptions === 0}
                  />
                  <div className="peer rtl:peer-checked:after:-translate-x-full relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300" />
                  <span className="ms-3 font-medium text-gray-900 text-sm">
                    {option.option.printName}
                  </span>
                </label>
                <span className="float-right text-sm">
                  +{option.option.price.toLocaleString()}円
                </span>
              </>
            ) : (
              <></>
            )}
            <p className="whitespace-pre-wrap text-slate-500 text-sm leading-8">
              {option.option.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
