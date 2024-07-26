"use client";

import { addMonths } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import type { IFormInput } from "@/app/types/IFormInput";
import { Controller, useFormContext } from "react-hook-form";

type CalendarProps = {
  minDate: Date;
};

export default function Calendar({ minDate }: CalendarProps) {
  const [month, setMonth] = useState(minDate);

  const {
    control,
    formState: { errors },
  } = useFormContext<IFormInput>();

  return (
    <section>
      <Controller
        name="startDateTime"
        control={control}
        render={({ field }) => (
          <DayPicker
            locale={ja}
            mode="single"
            captionLayout="dropdown"
            showOutsideDays
            startMonth={minDate}
            endMonth={addMonths(minDate, 3)}
            month={month}
            onMonthChange={setMonth}
            selected={field.value}
            onSelect={field.onChange}
            disabled={{
              before: minDate,
            }}
            footer={
              <button
                type="button"
                onClick={() => setMonth(minDate)}
                className="!font-bold"
              >
                今月
              </button>
            }
          />
        )}
      />
      {errors.startDateTime && (
        <span className="text-red-500">
          {typeof errors.startDateTime?.message === "string"
            ? errors.startDateTime.message
            : ""}
        </span>
      )}
    </section>
  );
}
