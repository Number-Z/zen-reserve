"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusString } from "@/lib/utils";
import type { ReservationsType } from "@/services/getReservations";
import type { UnavailableDateTimeType } from "@/services/getUnavailableDateTimes";
import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { toZonedTime } from "date-fns-tz";
import { useRouter } from "next/navigation";

type CalendarViewProps = {
  reservations: ReservationsType;
  unavailableDateTimes: UnavailableDateTimeType;
};

const getColor = (serviceName: string) => {
  switch (serviceName) {
    case "SAUNPING":
      return "#000000";
    case "SUPING":
      return "#00ae97";
    case "CAMPING":
      return "#c3a664";
    default:
      return "#ffffff";
  }
};

const getTextColor = (instructorIds: number[]) => {
  if (instructorIds.length > 0) {
    return "#fff";
  }
  return "#f00";
};

export default function CalendarView({
  reservations,
  unavailableDateTimes,
}: CalendarViewProps) {
  const router = useRouter();

  const events = [];
  events.push(
    ...reservations.map((reservation) => ({
      id: reservation.reservationId.toString(),
      type: "reservation",
      title: `${reservation.lastName} ${reservation.firstName} (${getStatusString(reservation.status)})`,
      start: toZonedTime(reservation.startDateTime, "Asia/Tokyo"),
      end: toZonedTime(reservation.endDateTime, "Asia/Tokyo"),
      color: getColor(reservation.Service?.name ?? ""),
      textColor: getTextColor(
        reservation.InstructorReservation.map(
          (instructorReservation) => instructorReservation.instructorId,
        ),
      ),
    })),
  );
  events.push(
    ...unavailableDateTimes.map((unavailableDateTime) => ({
      id: unavailableDateTime.unavailableDateTimeId.toString(),
      type: "unavailableDateTime",
      title: `${unavailableDateTime.Service?.name ?? "全サービス"} 予約停止`,
      start: toZonedTime(unavailableDateTime.startDateTime, "Asia/Tokyo"),
      end: toZonedTime(unavailableDateTime.endDateTime, "Asia/Tokyo"),
      color: "#000000",
      textColor: "#fff",
    })),
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約カレンダー</CardTitle>
        </CardHeader>
        <CardContent>
          <FullCalendar
            height="auto"
            locale={jaLocale}
            plugins={[dayGridPlugin, timeGridPlugin]}
            events={events}
            eventClick={(info) => {
              switch (info.event.extendedProps.type) {
                case "reservation":
                  router.push(`/dashboard/reservations/${info.event.id}`);
                  break;
                case "unavailableDateTime":
                  router.push(
                    `/dashboard/unavailable-date-times/${info.event.id}`,
                  );
                  break;
              }
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,dayGridMonth",
            }}
            initialView="dayGridMonth"
            nowIndicator={true}
            selectable={true}
            firstDay={1}
            showNonCurrentDates={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
