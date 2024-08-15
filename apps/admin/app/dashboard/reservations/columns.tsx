"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { getStatusString } from "@/lib/utils";
import type { ReservationsType } from "@/services/reservations/getReservations";
import type { ColumnDef } from "@tanstack/react-table";
import { differenceInHours, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<ReservationsType[number]>[] = [
  {
    accessorKey: "reservationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "serviceName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="サービス" />
    ),
    cell: (info) => info.row.original.Service?.name ?? "不明",
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="姓" />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="名" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="メールアドレス" />
    ),
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
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="予約時間" />
    ),
    cell: (info) =>
      `${differenceInHours(
        info.row.original.endDateTime,
        info.row.original.startDateTime,
      )}時間`,
  },
  {
    accessorKey: "subTotalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="小計" />
    ),
    cell: (info) => `¥${info.row.original.totalPrice.toLocaleString()}`,
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="割引" />
    ),
    cell: (info) => `¥${info.row.original.discount.toLocaleString()}`,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="合計" />
    ),
    cell: (info) =>
      `¥${(info.row.original.totalPrice - info.row.original.discount).toLocaleString()}`,
  },
  {
    accessorKey: "adultCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="大人" />
    ),
  },
  {
    accessorKey: "childCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="子供" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ステータス" />
    ),
    cell: (info) => getStatusString(info.row.original.status),
  },
  {
    accessorKey: "instructor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="インストラクター" />
    ),
    cell: (info) =>
      info.row.original.InstructorReservation.map(
        (instructorReservation) => instructorReservation.Instructor?.name,
      ).join(", ") || "未アサイン",
  },
  {
    accessorKey: "edit",
    header: "編集",
    cell: (info) => (
      <Link href={`/dashboard/reservations/${info.row.original.reservationId}`}>
        <Pencil className="ml-1 inline-block" size={14} />
      </Link>
    ),
  },
];
