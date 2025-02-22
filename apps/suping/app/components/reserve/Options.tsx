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
    { optionId: number; count: number }[]
  >([]);
  const [saunpingReservationCount, setSaunpingReservationCount] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!startDateTime) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const optionsRes = await fetch(
          `/api/options?date=${encodeURIComponent(startDateTime.toISOString())}`,
          { cache: "no-cache" },
        );
        const reservationsRes = await fetch(
          `/api/reservations?date=${encodeURIComponent(startDateTime.toISOString())}&serviceName=SAUNPING`,
          { cache: "no-cache" },
        );
        if (!optionsRes.ok || !reservationsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const { options } = await optionsRes.json();
        const { reservations } = await reservationsRes.json();

        setOptionCount(options);
        setSaunpingReservationCount(Number.parseInt(reservations));
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDateTime]);

  const getAvailableOptions = useCallback(
    (
      optionId: number,
      optionName: string,
      stock: number | null,
      limit: number | null,
    ) => {
      const reservedCount =
        optionCount.find((option) => option.optionId === optionId)?.count || 0;

      // サウナオプションの場合、SAUNPINGの予約数を差し引く
      if (optionName === "sauna") {
        const totalReservedCount = reservedCount + saunpingReservationCount;
        const availableStock =
          stock !== null
            ? Math.max(stock - totalReservedCount, 0)
            : Number.POSITIVE_INFINITY;
        const maxLimit = limit !== null ? limit : 10;
        return Math.min(availableStock, maxLimit);
      }
      const availableStock =
        stock !== null
          ? Math.max(stock - reservedCount, 0)
          : Number.POSITIVE_INFINITY;
      const maxLimit = limit !== null ? limit : 10;
      return Math.min(availableStock, maxLimit);
    },
    [optionCount, saunpingReservationCount],
  );

  return (
    <section className="flex flex-col gap-6 px-6">
      <h2 className="font-bold text-gray-900 text-xl">オプション選択</h2>
      {optionsServices.map((optionsService) => {
        const availableOptions = getAvailableOptions(
          optionsService.Option.optionId,
          optionsService.Option.name,
          optionsService.Option.stock,
          optionsService.Option.limit,
        );

        const unavailable = availableOptions === 0;
        const isDisabled =
          startDateTime == null || unavailable || isLoading || hasError;

        return (
          <div key={optionsService.Option.optionId} className="w-full">
            {optionsService.Option.displayType === "select" ? (
              <>
                <label htmlFor={optionsService.Option.name}>
                  <span className="text-sm">
                    {optionsService.Option.printName}
                  </span>
                  <span className="float-right text-sm">
                    +{optionsService.Option.price.toLocaleString()}円
                  </span>
                </label>
                {unavailable ? (
                  <div className="block w-full rounded-lg border border-gray-200 bg-gray-100 p-4 text-red-500 text-sm">
                    在庫なし
                  </div>
                ) : (
                  <select
                    {...register(`options.${optionsService.Option.name}`, {
                      valueAsNumber: true,
                    })}
                    id={optionsService.Option.name}
                    className="block w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                    disabled={isDisabled}
                  >
                    <option value="0">0</option>
                    {Array.from({ length: availableOptions }, (_, i) => (
                      <option
                        key={`${optionsService.Option.optionId}-${i}`}
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    ))}
                  </select>
                )}
              </>
            ) : optionsService.Option.displayType === "toggle" ? (
              <>
                <label
                  htmlFor={optionsService.Option.name}
                  className={`inline-flex items-center ${isDisabled ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                >
                  <input
                    id={optionsService.Option.name}
                    type="checkbox"
                    {...register(`options.${optionsService.Option.name}`)}
                    className="peer sr-only"
                    disabled={isDisabled}
                  />
                  <div className="peer rtl:peer-checked:after:-translate-x-full relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300" />
                  <span className="ms-3 font-medium text-gray-900 text-sm">
                    {optionsService.Option.printName}
                  </span>
                </label>
                <span className="float-right text-sm">
                  +{optionsService.Option.price.toLocaleString()}円
                </span>
                {unavailable && (
                  <p className="mt-2 text-red-500 text-sm">在庫なし</p>
                )}
              </>
            ) : (
              <></>
            )}
            <p className="whitespace-pre-wrap text-slate-500 text-sm leading-8">
              {optionsService.Option.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
