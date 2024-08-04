"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { UnavailableDateTimeType } from "@/services/getUnavailableDateTimes";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<UnavailableDateTimeType[number]>[] = [
  {
    accessorKey: "unavailableDateTimeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "serviceName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="サービス" />
    ),
    cell: (info) => info.row.original.Service?.name ?? "全サービス",
  },
  {
    accessorKey: "startDateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="開始日時" />
    ),
    cell: (info) =>
      format(
        toZonedTime(info.row.original.startDateTime, "Asia/Tokyo"),
        "yyyy/MM/dd HH:mm",
      ),
  },
  {
    accessorKey: "endDateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="終了日時" />
    ),
    cell: (info) =>
      format(
        toZonedTime(info.row.original.endDateTime, "Asia/Tokyo"),
        "yyyy/MM/dd HH:mm",
      ),
  },
  {
    accessorKey: "edit",
    header: "編集",
    cell: (info) => (
      <Link
        href={`/dashboard/unavailable-date-times/${info.row.original.unavailableDateTimeId}`}
      >
        <Pencil className="ml-1 inline-block" size={14} />
      </Link>
    ),
  },
];
