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
        tentSetup: false,
        firewood: false,
        saunaOil: false,
        bbqSet: false,
        additionalChairs: 0,
        swimWears: 0,
        bathTowels: 0,
        crocses: 0,
        saunaHats: 0,
      },
      customer: {
        lastName: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        adultCount: 0,
        childCount: 0,
      },
      discoveryMethods: [],
      totalPrice: 5000,
    },
    resolver: zodResolver(schema),
  });

  return <ReactHookFormProvider {...methods}>{children}</ReactHookFormProvider>;
}
