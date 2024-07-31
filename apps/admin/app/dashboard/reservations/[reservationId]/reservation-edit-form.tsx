"use client";

import Customer from "@/app/dashboard/reservations/[reservationId]/customer";
import Details from "@/app/dashboard/reservations/[reservationId]/details";
import Options from "@/app/dashboard/reservations/[reservationId]/options";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type ReservationSchemaType,
  reservationSchema,
} from "@/schemas/reservation";
import type { DiscoveryMethodsType } from "@/services/getDiscoveryMethods";
import type { OptionsType } from "@/services/getOptionsServices";
import type { ReservationType } from "@/services/getReservationById";
import { updateReservation } from "@/services/updateReservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type ReservationEditFormProps = {
  reservation: Exclude<ReservationType, null>;
  discoveryMethods: DiscoveryMethodsType;
  options: OptionsType;
};

export default function ReservationEditForm({
  reservation,
  discoveryMethods,
  options,
}: ReservationEditFormProps) {
  const defaultOptions = options.reduce(
    (acc, option) => {
      const optionReservation = reservation.optionReservations.find(
        (optionReservation) => optionReservation.optionId === option.optionId,
      );
      acc[option.name] = optionReservation?.quantity ?? 0;
      return acc;
    },
    {} as Record<string, number | boolean>,
  );

  const form = useForm<ReservationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      reservationId: reservation.reservationId,
      serviceId: reservation.serviceId,
      startDateTime: reservation.startDateTime,
      endDateTime: reservation.endDateTime,
      customer: {
        lastName: reservation.lastName,
        firstName: reservation.firstName,
        email: reservation.email,
        phoneNumber: reservation.phoneNumber,
        adultCount: reservation.adultCount,
        childCount: reservation.childCount,
        otherInfo: reservation.otherInfo ?? "",
      },
      status: reservation.status,
      discount: reservation.discount,
      totalPrice: reservation.totalPrice,
      discoveryMethods: reservation.discoveryMethods.map(
        (discoveryMethod) => discoveryMethod.discoveryMethodName,
      ),
      options: defaultOptions,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateReservation(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Customer />
        <Details
          defaultTotalPrice={reservation.totalPrice}
          discoveryMethods={discoveryMethods}
        />
        <Options options={options} />
        <Button type="submit">更新</Button>
      </form>
    </Form>
  );
}
