"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function ResetForm() {
  const { reset } = useFormContext<IFormInput>();

  useEffect(() => {
    reset();
  }, [reset]);

  return null;
}
