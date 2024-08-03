"use client";

import type { OptionsServicesType } from "@/app/services/getOptionsServices";
import type { IFormInput } from "@/app/types/IFormInput";
import { useFormContext } from "react-hook-form";

const TableRow = ({ label, value }: { label: string; value: string }) => (
  <tr className="border-b">
    <td className="h-12 px-4 text-left align-middle">{label}</td>
    <td
      className={`h-12 px-4 text-left align-middle ${value !== "なし" ? "font-bold" : ""}`}
    >
      {value}
    </td>
  </tr>
);

type OptionsTableProps = {
  optionsServices: OptionsServicesType;
};

export default function OptionsTable({ optionsServices }: OptionsTableProps) {
  const { getValues } = useFormContext<IFormInput>();
  const values = getValues();

  const rows = optionsServices.map((optionsService) => {
    const option = optionsService.Option;
    const optionValue =
      values.options[option.name as keyof typeof values.options];

    let displayValue: string;
    if (typeof optionValue === "boolean") {
      displayValue = optionValue ? "あり" : "なし";
    } else if (typeof optionValue === "number") {
      displayValue = optionValue > 0 ? `${optionValue}個` : "なし";
    } else {
      displayValue = "なし";
    }

    return {
      label: option.printName,
      value: displayValue,
    };
  });

  return (
    <table className="w-full text-sm">
      <thead className="[&_tr]:border-b">
        <tr className="border-b">
          <th className="h-12 px-4 text-left align-middle">オプション名</th>
          <th className="h-12 px-4 text-left align-middle">選択状況</th>
        </tr>
      </thead>
      <tbody className="[&_tr:last-child]:border-0">
        {rows.map((row) => (
          <TableRow key={row.label} label={row.label} value={row.value} />
        ))}
        <TableRow
          key="その他ご要望"
          label="その他ご要望"
          value={values.customer.otherInfo ?? "なし"}
        />
      </tbody>
    </table>
  );
}
