import type { UnavailableDateTimeType } from "@/app/services/getUnavailableDateTimes";
import { format, isEqual, isWithinInterval, set } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

type TimeProps = {
  unavailableDateTimes: UnavailableDateTimeType;
};

export default function Time({ unavailableDateTimes }: TimeProps) {
  const { control, resetField } = useFormContext();

  const { field: startDateTime } = useController({
    name: "startDateTime",
    control,
  });

  const [optionCount, setOptionCount] = useState<
    { optionId: number; name: string; count: number }[]
  >([]);
  const [totalReservationCount, setTotalReservationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // 日付が選択されたら、その日のオプション（SUPINGのサウナオプション数を予約可能数から差し引くため）と予約数を取得する
  useEffect(() => {
    if (!startDateTime.value) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const optionsRes = await fetch(
          `/api/options?date=${encodeURIComponent(startDateTime.value.toISOString())}`,
          { cache: "no-store" },
        );
        const reservationsRes = await fetch(
          `/api/reservations?date=${encodeURIComponent(startDateTime.value.toISOString())}`,
          {
            cache: "no-store",
          },
        );
        if (!optionsRes.ok || !reservationsRes.ok) {
          throw new Error("Failed to fetch data");
        }
        const { options } = await optionsRes.json();
        const { reservations } = await reservationsRes.json();

        setOptionCount(options);
        setTotalReservationCount(Number.parseInt(reservations));
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDateTime.value]);

  const dateTimes: Date[] = [
    { hours: 10, minutes: 30 },
    { hours: 13, minutes: 30 },
  ].map((time) =>
    set(startDateTime.value, { ...time, seconds: 0, milliseconds: 0 }),
  );

  const getAvailableCount = () => {
    const maxCapacity = 3;
    const saunaCount =
      optionCount.find((option) => option.name === "sauna")?.count ?? 0;
    const availableCount = maxCapacity - totalReservationCount - saunaCount;
    return Math.max(availableCount, 0);
  };

  const getReservationStatus = () => {
    if (isLoading) return <span className="text-2xl text-gray-400">-</span>;
    if (hasError) return <span className="text-2xl text-yellow-500">!</span>;

    const isUnavailable = unavailableDateTimes.some((unavailableDateTime) =>
      isWithinInterval(startDateTime.value, {
        start: toZonedTime(
          new Date(unavailableDateTime.startDateTime),
          "Asia/Tokyo",
        ),
        end: toZonedTime(
          new Date(unavailableDateTime.endDateTime),
          "Asia/Tokyo",
        ),
      }),
    );
    if (isUnavailable) return <span className="cursor-none text-2xl">×</span>;

    const availableCount = getAvailableCount();
    if (availableCount >= 3)
      return <span className="text-2xl text-red-500">◎</span>;
    if (availableCount === 2)
      return <span className="text-2xl text-red-500">◯</span>;
    if (availableCount === 1)
      return <span className="text-2xl text-red-500">△</span>;
    return <span className="cursor-none text-2xl">×</span>;
  };

  if (startDateTime.value == null) {
    return (
      <section className="px-6 font-bold">
        <div className="mb-[198px] grid grid-cols-3 border-b-2 p-4 text-center text-lg text-slate-600 md:gap-10">
          <div className="col-span-1">時刻</div>
          <div className="col-span-2">空き状況</div>
        </div>
      </section>
    );
  }

  const handleClick = (dateTime: Date) => {
    resetField("options");
    startDateTime.onChange(dateTime);
  };

  return (
    <section className="w-full px-6 font-bold">
      <div className="grid grid-cols-3 border-b-2 p-4 text-center text-lg text-slate-600 md:gap-10">
        <div className="col-span-1">時刻</div>
        <div className="col-span-2">空き状況</div>
      </div>
      {dateTimes.map((dateTime) => {
        const isUnavailable = unavailableDateTimes.some((unavailableDateTime) =>
          isWithinInterval(dateTime, {
            start: toZonedTime(
              new Date(unavailableDateTime.startDateTime),
              "Asia/Tokyo",
            ),
            end: toZonedTime(
              new Date(unavailableDateTime.endDateTime),
              "Asia/Tokyo",
            ),
          }),
        );
        const isDisabled =
          isLoading || hasError || isUnavailable || getAvailableCount() <= 0;
        const isSelected =
          startDateTime.value && isEqual(startDateTime.value, dateTime);
        return (
          <button
            type="button"
            key={dateTime.toISOString()}
            className={`grid w-full grid-cols-3 border-b-2 px-4 py-4 text-center text-base ${isSelected ? "bg-[#2C2C2C] text-white" : ""}${isDisabled ? "opacity-50" : ""}`}
            onClick={() => handleClick(dateTime)}
            disabled={isDisabled}
          >
            <div className="col-span-1 flex h-full items-center justify-center">
              {format(dateTime, "HH:mm")}
            </div>
            <div className="col-span-2 flex h-full items-center justify-center">
              {getReservationStatus()}
            </div>
          </button>
        );
      })}
    </section>
  );
}
