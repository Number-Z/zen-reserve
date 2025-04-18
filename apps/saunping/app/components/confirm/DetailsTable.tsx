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

export default function DetailsTable() {
  const { getValues } = useFormContext<IFormInput>();
  const values = getValues();

  const rows = [
    {
      label: "氏名",
      value: `${values.customer.lastName} ${values.customer.firstName}`,
    },
    {
      label: "メールアドレス",
      value: values.customer.email,
    },
    {
      label: "電話番号",
      value: values.customer.phoneNumber,
    },
    // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
    { label: "予約日", value: format(values.startDateTime!, "yyyy年MM月dd日") },
    {
      label: "予約時間",
      // biome-ignore lint/style/noNonNullAssertion: バリデーション済みのため
      value: `${format(values.startDateTime!, "HH:mm")} - ${format(values.endDateTime!, "HH:mm")}`,
    },
    {
      label: "人数",
      value: `${values.customer.adultCount}名`,
    },
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
