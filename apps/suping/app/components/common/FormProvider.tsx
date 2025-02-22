"use client";

import { schema } from "@/app/consts/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider as ReactHookFormProvider,
  useForm,
} from "react-hook-form";

export default function FormProvider({
  children,
}: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      startDateTime: undefined,
      endDateTime: undefined,
      options: {
        sauna: false,
        bbqSet: false,
        swimWears: 0,
        bathTowels: 0,
        crocses: 0,
      },
      customer: {
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        adultCount: 2,
        childCount: 0,
      },
      discoveryMethods: [],
      totalPrice: 5500,
    },
    resolver: zodResolver(schema),
  });

  return <ReactHookFormProvider {...methods}>{children}</ReactHookFormProvider>;
}
