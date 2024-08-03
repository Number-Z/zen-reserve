import type { OptionsServicesType } from "@/app/services/getOptionsServices";
import { useCallback, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type OptionsProps = {
  optionsServices: OptionsServicesType;
};

export default function Options({ optionsServices }: OptionsProps) {
  const { register } = useFormContext();

  const startDateTime = useWatch({
    name: "startDateTime",
  });

  const [optionCount, setOptionCount] = useState<
    { optionId: number; name: string; count: number }[]
  >([]);
  const [reservationCount, setReservationCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!startDateTime) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const optionsRes = await fetch(
          `/api/options?date=${encodeURIComponent(startDateTime.toISOString())}`,
          {
            cache: "no-cache",
          },
        );
        const reservationsRes = await fetch(
          `/api/reservations?date=${encodeURIComponent(
            startDateTime.toISOString(),
          )}`,
          { cache: "no-cache" },
        );
        if (!optionsRes.ok || !reservationsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const { options } = await optionsRes.json();
        const { reservations } = await reservationsRes.json();

        setOptionCount(options);
        setReservationCount(Number.parseInt(reservations));
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDateTime]);

  const getAvailableCount = () => {
    const maxCapacity = 3;
    const saunaCount =
      optionCount.find((option) => option.name === "sauna")?.count ?? 0;
    const availableCount = maxCapacity - reservationCount - saunaCount;
    return Math.max(availableCount, 0);
  };

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
      {optionsServices.map((optionService) => {
        const availableOptions = getAvailableOptions(
          optionService.optionId,
          optionService.Option.stock,
          optionService.Option.limit,
        );

        const unavailable = availableOptions === 0;
        const isDisabled =
          startDateTime == null ||
          unavailable ||
          isLoading ||
          hasError ||
          getAvailableCount() === 0;

        return (
          <div key={optionService.optionId} className="w-full">
            {optionService.Option.displayType === "select" ? (
              <>
                <label htmlFor={optionService.Option.name}>
                  <span className="text-sm">
                    {optionService.Option.printName}
                  </span>
                  <span className="float-right text-sm">
                    +{optionService.Option.price.toLocaleString()}円
                  </span>
                </label>
                {unavailable ? (
                  <div className="block w-full rounded-lg border border-gray-200 bg-gray-100 p-4 text-red-500 text-sm">
                    在庫なし
                  </div>
                ) : (
                  <select
                    {...register(`options.${optionService.Option.name}`, {
                      valueAsNumber: true,
                    })}
                    id={optionService.Option.name}
                    className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                    disabled={isDisabled}
                  >
                    <option value="0">0</option>
                    {Array.from({ length: availableOptions }, (_, i) => (
                      <option
                        key={`${optionService.optionId}-${i}`}
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    ))}
                  </select>
                )}
              </>
            ) : optionService.Option.displayType === "toggle" ? (
              <>
                <label
                  htmlFor={optionService.Option.name}
                  className={`inline-flex items-center ${isDisabled ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                >
                  <input
                    id={optionService.Option.name}
                    type="checkbox"
                    {...register(`options.${optionService.Option.name}`)}
                    className="peer sr-only"
                    disabled={isDisabled}
                  />
                  <div className="peer rtl:peer-checked:after:-translate-x-full relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300" />
                  <span className="ms-3 font-medium text-gray-900 text-sm">
                    {optionService.Option.printName}
                  </span>
                </label>
                <span className="float-right text-sm">
                  +{optionService.Option.price.toLocaleString()}円
                </span>
                {unavailable && (
                  <p className="mt-2 text-red-500 text-sm">在庫なし</p>
                )}
              </>
            ) : (
              <></>
            )}
            <p className="whitespace-pre-wrap text-slate-500 text-sm leading-8">
              {optionService.Option.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
