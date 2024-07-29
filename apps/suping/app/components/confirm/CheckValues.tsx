"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { redirect } from "next/navigation";
import { useFormContext } from "react-hook-form";

export default function CheckValues() {
  const { getValues } = useFormContext<IFormInput>();
  const values = getValues();

  if (values.startDateTime == null || values.totalPrice == null) {
    redirect("/");
  }

  return null;
}
