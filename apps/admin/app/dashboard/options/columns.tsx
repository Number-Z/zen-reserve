"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { OptionsServicesType } from "@/services/options/getOptionsServices";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<OptionsServicesType[number]>[] = [
  {
    accessorKey: "serviceName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="サービス" />
    ),
    cell: (info) => info.row.original.Service.name,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="オプション名" />
    ),
    cell: (info) => info.row.original.Option.name,
  },
  {
    accessorKey: "printName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="表示名" />
    ),
    cell: (info) => info.row.original.Option.printName,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="説明" />
    ),
    cell: (info) => info.row.original.Option.description,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="価格" />
    ),
    cell: (info) => info.row.original.Option.price,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="在庫" />
    ),
    cell: (info) => info.row.original.Option.stock,
  },
  {
    accessorKey: "limit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="上限" />
    ),
    cell: (info) => info.row.original.Option.limit,
  },
  {
    accessorKey: "displayType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="表示タイプ" />
    ),
    cell: (info) => info.row.original.Option.displayType,
  },
  {
    accessorKey: "order",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="表示順" />
    ),
    cell: (info) => info.row.original.order,
  },
  {
    accessorKey: "edit",
    header: "編集",
    cell: (info) => (
      <Link
        href={`/dashboard/options/${info.row.original.serviceId}/${info.row.original.optionId}`}
      >
        <Pencil className="ml-1 inline-block" size={14} />
      </Link>
    ),
  },
];
