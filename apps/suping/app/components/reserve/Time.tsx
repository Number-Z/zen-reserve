import { NEXT_PUBLIC_SERVICE_NAME } from "@/app/consts/consts";
import type { UnavailableDateTimeType } from "@/app/services/getUnavailableDateTimes";
import { addHours, format, isEqual, isWithinInterval, set } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useCallback, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

type TimeProps = {
  unavailableDateTimes: UnavailableDateTimeType;
};

export default function Time({ unavailableDateTimes }: TimeProps) {
  const { control, setValue, resetField } = useFormContext();

  const { field: startDateTime } = useController({
    name: "startDateTime",
    control,
  });

  const [reservations, setReservations] = useState<{ startDateTime: Date }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchReservationsCount = useCallback(async (selectedDateTime: Date) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await fetch(
        `/api/reservations?date=${encodeURIComponent(
          selectedDateTime.toISOString(),
        )}&serviceName=${NEXT_PUBLIC_SERVICE_NAME}`,
        {
          cache: "no-store",
        },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const { reservations } = await res.json();

      setReservations(reservations);
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

  const getReservationStatus = (dateTime: Date) => {
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

    const isReserved = reservations.some((reservation) =>
      isEqual(new Date(reservation.startDateTime), dateTime),
    );
    if (isReserved) return <span className="text-2xl">×</span>;
    return <span className="text-2xl text-red-500">◎</span>;
  };

  const handleClick = (dateTime: Date) => {
    resetField("options");
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

        const isReserved = reservations.some((reservation) =>
          isEqual(new Date(reservation.startDateTime), dateTime),
        );
        const isDisabled = isLoading || hasError || isReserved || isUnavailable;
        const isSelected =
          startDateTime.value && isEqual(startDateTime.value, dateTime);
        return (
          <button
            type="button"
            key={dateTime.toISOString()}
            className={`grid w-full grid-cols-3 border-b-2 px-4 py-4 text-center text-base ${
              isSelected ? "bg-[#2C2C2C] text-white" : ""
            }${isDisabled ? " opacity-50" : ""}`}
            onClick={() => handleClick(dateTime)}
            disabled={isDisabled}
          >
            <div className="col-span-1 flex h-full items-center justify-center">
              {format(dateTime, "HH:mm")}
            </div>
            <div className="col-span-2 flex h-full items-center justify-center">
              {getReservationStatus(dateTime)}
            </div>
          </button>
        );
      })}
    </section>
  );
}
