"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RESERVATION_STATUS } from "@/consts/status";
import { getStatusString } from "@/lib/utils";
import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { Reservation, Service } from "@prisma/client";
import { toZonedTime } from "date-fns-tz";
import { useRouter } from "next/navigation";

type CalendarViewProps = {
  reservations: (Reservation & {
    service: Service;
  })[];
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

const getTextColor = (instructorId: number | null) => {
  if (instructorId) {
    return "#fff";
  }
  return "#f00";
};

export default function CalendarView({ reservations }: CalendarViewProps) {
  const router = useRouter();

  const events = reservations.map((reservation) => ({
    id: reservation.reservationId.toString(),
    title: `${reservation.lastName} ${reservation.firstName} (${getStatusString(reservation.status)})`,
    start: toZonedTime(reservation.startDateTime, "Asia/Tokyo"),
    end: toZonedTime(reservation.endDateTime, "Asia/Tokyo"),
    color: getColor(reservation.service.name),
    textColor: getTextColor(reservation.instructorId),
  }));

  return (
    <div className="flex h-full flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>予約カレンダー</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <FullCalendar
            height="auto"
            locale={jaLocale}
            plugins={[dayGridPlugin, timeGridPlugin]}
            events={events}
            eventClick={(info) => {
              router.push(`/dashboard/reservations/${info.event.id}`);
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,dayGridMonth",
            }}
            initialView="dayGridMonth"
            nowIndicator={true}
            selectable={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
