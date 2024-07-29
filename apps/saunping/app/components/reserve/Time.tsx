import { format, isEqual, set } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

export default function Time() {
  const { control } = useFormContext();

  const { field } = useController({
    name: "startDateTime",
    control,
  });

  const [totalReservationCount, setTotalReservationCount] = useState(0);

  const fetchReservationsCount = useCallback(async (selectedDateTime: Date) => {
    const res = await fetch(
      `/api/reservations?date=${encodeURIComponent(selectedDateTime.toISOString())}`,
      {
        cache: "no-cache",
      },
    );
    const { reservations } = await res.json();
    setTotalReservationCount(Number.parseInt(reservations));
  }, []);

  useEffect(() => {
    if (field.value) {
      fetchReservationsCount(field.value);
    }
  }, [field.value, fetchReservationsCount]);

  if (field.value == null) {
    return (
      <section className="px-6 font-bold">
        <div className="mb-[198px] grid grid-cols-3 border-b-2 p-4 text-center text-lg text-slate-600 md:gap-10">
          <div className="col-span-1">時刻</div>
          <div className="col-span-2">空き状況</div>
        </div>
      </section>
    );
  }

  const dateTimes = [11, 12, 13].map((hour) =>
    set(field.value, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 }),
  );

  const getReservationStatus = (totalReservationCount: number) => {
    if (totalReservationCount === 0)
      return <span className="text-2xl text-red-500">◎</span>;
    if (totalReservationCount === 1)
      return <span className="text-2xl text-red-500">◯</span>;
    if (totalReservationCount === 2)
      return <span className="text-2xl text-red-500">△</span>;
    return <span className="cursor-none text-2xl">×</span>;
  };

  return (
    <section className="w-full px-6 font-bold">
      <div className="grid grid-cols-3 border-b-2 p-4 text-center text-lg text-slate-600 md:gap-10">
        <div className="col-span-1">時刻</div>
        <div className="col-span-2">空き状況</div>
      </div>
      {dateTimes.map((dateTime) => {
        const isDisabled = totalReservationCount >= 3;
        const isSelected = field.value && isEqual(field.value, dateTime);
        return (
          <button
            type="button"
            key={dateTime.toISOString()}
            className={`grid w-full grid-cols-3 border-b-2 px-4 py-4 text-center text-base ${isSelected ? "bg-[#2C2C2C] text-white" : ""}${isDisabled ? "opacity-50" : ""}`}
            onClick={() => field.onChange(dateTime)}
            disabled={isDisabled}
          >
            <div className="col-span-1 flex h-full items-center justify-center">
              {format(dateTime, "HH:mm")}
            </div>
            <div className="col-span-2 flex h-full items-center justify-center">
              {getReservationStatus(totalReservationCount)}
            </div>
          </button>
        );
      })}
    </section>
  );
}
