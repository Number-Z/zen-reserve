import { addHours, format, isEqual, set } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

export default function Time() {
  const { control, setValue } = useFormContext();

  const { field: startDateTime } = useController({
    name: "startDateTime",
    control,
  });

  const [totalReservationCount, setTotalReservationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchReservationsCount = useCallback(async (selectedDateTime: Date) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await fetch(
        `/api/reservations?date=${encodeURIComponent(selectedDateTime.toISOString())}`,
        {
          cache: "no-cache",
        },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const { reservations } = await res.json();
      setTotalReservationCount(Number.parseInt(reservations));
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (startDateTime.value) {
      fetchReservationsCount(startDateTime.value);
    }
  }, [startDateTime.value, fetchReservationsCount]);

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

  const dateTimes: Date[] = [
    { hours: 9, minutes: 0 },
    { hours: 11, minutes: 30 },
    { hours: 14, minutes: 0 },
  ].map((time) =>
    set(startDateTime.value, { ...time, seconds: 0, milliseconds: 0 }),
  );

  const getReservationStatus = () => {
    if (isLoading) return <span className="text-2xl text-gray-400">-</span>;
    if (hasError) return <span className="text-2xl text-yellow-500">!</span>;
    if (totalReservationCount === 0)
      return <span className="text-2xl text-red-500">◎</span>;
    return <span className="cursor-none text-2xl">×</span>;
  };

  const handleClick = (dateTime: Date) => {
    startDateTime.onChange(dateTime);
    setValue("endDateTime", addHours(dateTime, 2));
  };

  return (
    <section className="w-full px-6 font-bold">
      <div className="grid grid-cols-3 border-b-2 p-4 text-center text-lg text-slate-600 md:gap-10">
        <div className="col-span-1">時刻</div>
        <div className="col-span-2">空き状況</div>
      </div>
      {dateTimes.map((dateTime) => {
        const isDisabled = isLoading || hasError || totalReservationCount >= 1;
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
