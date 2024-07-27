"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { format } from "date-fns-tz";
import { useFormContext } from "react-hook-form";

const TableRow = ({ label, value }: { label: string; value: string }) => (
  <tr className="border-b">
    <td className="h-12 px-4 text-left align-middle">{label}</td>
    <td className="h-12 px-4 text-left align-middle">{value}</td>
  </tr>
);

export default function SummaryTable() {
  const { getValues } = useFormContext<IFormInput>();
  const values = getValues();

  const rows = [
    // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
    { label: "予約日", value: format(values.startDateTime!, "yyyy年MM月dd日") },
    // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
    { label: "予約時刻", value: format(values.startDateTime!, "HH:mm") },
    { label: "金額", value: `${values.totalPrice.toLocaleString()}円` },
    { label: "支払い方法", value: "現地払い" },
  ];

  return (
    <table className="w-full text-sm">
      <thead className="[&_tr]:border-b">
        <tr className="border-b">
          <th className="h-12 px-4 text-left align-middle">項目</th>
          <th className="h-12 px-4 text-left align-middle">内容</th>
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {rows.map((row) => (
          <TableRow key={row.label} label={row.label} value={row.value} />
        ))}
      </tbody>
    </table>
  );
}
