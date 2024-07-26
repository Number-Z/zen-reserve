"use client";

import type { IFormInput } from "@/app/types/IFormInput";
import { useFormContext } from "react-hook-form";

export default function SummaryTable() {
  const { getValues } = useFormContext<IFormInput>();
  const values = getValues();

  return (
    <>
      <h3 className="font-bold">予約詳細</h3>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>内容</th>
          </tr>
        </thead>
        {/* <tbody>
          <tr>
            <td className="font-medium">予約日</td>
            <td>{}</td>
          </tr>
          <tr>
            <td className="font-medium">予約時刻</td>
            <td>{reservationTime ? format(reservationTime, "HH:mm") : ""}</td>
          </tr>
          <tr>
            <td className="font-medium">金額</td>
            <td>{totalPrice}円</td>
          </tr>
          <tr>
            <td className="font-medium">支払い方法</td>
            <td>現地払い</td>
          </tr>
        </tbody> */}
      </table>
    </>
  );
}
