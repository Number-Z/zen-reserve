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
import type { InstructorsType } from "@/services/getInstructors";
import type { OptionsServicesType } from "@/services/getOptionsServices";
import type { ReservationType } from "@/services/getReservationById";
import { updateReservation } from "@/services/updateReservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type ReservationEditFormProps = {
  reservation: Exclude<ReservationType, null>;
  instructors: InstructorsType;
  discoveryMethods: DiscoveryMethodsType;
  optionsServices: OptionsServicesType;
};

export default function ReservationEditForm({
  reservation,
  instructors,
  discoveryMethods,
  optionsServices,
}: ReservationEditFormProps) {
  const router = useRouter();

  const defaultOptions = optionsServices.reduce(
    (acc, optionService) => {
      const optionReservation = reservation.OptionReservation.find(
        (optionReservation) =>
          optionReservation.optionId === optionService.optionId,
      );
      acc[optionService.name] = optionReservation?.quantity ?? 0;
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
      instructorId: reservation.instructorId ?? 0,
      discount: reservation.discount,
      totalPrice: reservation.totalPrice,
      discoveryMethods: reservation.DiscoveryMethodReservation.map(
        (discoveryMethod) => discoveryMethod.discoveryMethodName,
      ),
      options: defaultOptions,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateReservation(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Customer />
        <Details
          defaultTotalPrice={reservation.totalPrice}
          instructors={instructors}
          discoveryMethods={discoveryMethods}
        />
        <Options optionsServices={optionsServices} />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              router.back();
            }}
          >
            戻る
          </Button>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                更新中...
              </>
            ) : (
              "更新"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
