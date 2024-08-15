"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { InstructorsType } from "@/services/instructors/getInstructors";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<InstructorsType[number]>[] = [
  {
    accessorKey: "instructorId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="名前" />
    ),
    cell: (info) => info.row.original.name,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="メールアドレス" />
    ),
    cell: (info) => info.row.original.email ?? "-",
  },
  {
    accessorKey: "edit",
    header: "編集",
    cell: (info) => (
      <Link href={`/dashboard/instructors/${info.row.original.instructorId}`}>
        <Pencil className="ml-1 inline-block" size={14} />
      </Link>
    ),
  },
];
