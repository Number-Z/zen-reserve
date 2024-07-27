"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { redirect } from "next/navigation";
import { useFormContext } from "react-hook-form";

type CheckValuesProps = {
  serviceName: string;
};

export default function CheckValues({ serviceName }: CheckValuesProps) {
  const { getValues } = useFormContext<IFormInput>();
  const values = getValues();

  if (values.startDateTime == null || values.totalPrice == null) {
    redirect(`/${serviceName}`);
  }

  return null;
}
