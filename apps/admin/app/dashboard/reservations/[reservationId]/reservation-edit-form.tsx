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
import type { InstructorsType } from "@/services/instructors/getInstructors";
import type { DiscoveryMethodsType } from "@/services/reservations/getDiscoveryMethods";
import type { OptionsServiceType } from "@/services/reservations/getOptionsService";
import type { ReservationType } from "@/services/reservations/getReservationById";
import { updateReservation } from "@/services/reservations/updateReservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type ReservationEditFormProps = {
  reservation: Exclude<ReservationType, null>;
  instructors: InstructorsType;
  discoveryMethods: DiscoveryMethodsType;
  optionsService: OptionsServiceType;
};

export default function ReservationEditForm({
  reservation,
  instructors,
  discoveryMethods,
  optionsService,
}: ReservationEditFormProps) {
  const router = useRouter();

  const defaultOptions = optionsService.reduce(
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

  const basePrice =
    reservation.totalPrice -
    reservation.OptionReservation.reduce((total, option) => {
      const optionService = optionsService.find(
        (os) => os.optionId === option.optionId,
      );
      return (
        total + (optionService ? optionService.price * option.quantity : 0)
      );
    }, 0);

  const form = useForm<ReservationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      reservationId: reservation.reservationId,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      serviceId: reservation.serviceId!,
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
      instructorId: reservation.InstructorReservation.map(
        (instructor) => instructor.instructorId,
      ),
      discount: reservation.discount,
      totalPrice: basePrice,
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
          basePrice={basePrice}
          instructors={instructors}
          discoveryMethods={discoveryMethods}
          optionsService={optionsService}
        />
        <Options optionsService={optionsService} />
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
