import { RESERVATION_STATUS } from "@/consts/status";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ステータスを文字列に変換する関数
export const getStatusString = (status: keyof typeof RESERVATION_STATUS) => {
  switch (status) {
    case RESERVATION_STATUS.PENDING:
      return "仮予約";
    case RESERVATION_STATUS.CONFIRMED:
      return "確定";
    case RESERVATION_STATUS.CANCELED:
      return "キャンセル済み";
    default:
      return "不明";
  }
};
