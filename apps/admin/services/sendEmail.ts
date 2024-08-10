"use server";

import type { RESERVATION_STATUS } from "@/consts/status";
import ReservationCanceled from "@/emails/ReservationCanceled";
import ReservationConfirmed from "@/emails/ReservationConfirmed";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { createElement } from "react";

type EmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

const smtpOptions = {
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: Number.parseInt(process.env.SMTP_PORT || "2525"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "user",
    pass: process.env.SMTP_PASSWORD || "password",
  },
};

export const sendMail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail(data);
};

type SendEmailParams = {
  from: string;
  to: string;
  serviceName: string;
  status: keyof typeof RESERVATION_STATUS;
  reservationDetails: { label: string; value: string }[];
  options: { label: string; value: string }[];
};

export async function sendEmail({
  from,
  to,
  serviceName,
  status,
  reservationDetails,
  options,
}: SendEmailParams) {
  switch (status) {
    case "CONFIRMED":
      await sendMail({
        from,
        to,
        subject: `予約確定 - ${serviceName}`,
        html: render(
          createElement(ReservationConfirmed, {
            serviceName,
            reservationDetails,
            options,
          }),
        ),
      });
      break;
    case "CANCELED":
      await sendMail({
        from,
        to,
        subject: `予約キャンセル - ${serviceName}`,
        html: render(
          createElement(ReservationCanceled, {
            serviceName,
            reservationDetails,
            options,
          }),
        ),
      });
      break;
    default:
      await sendMail({
        from,
        to,
        subject: `予約更新 - ${serviceName}`,
        html: render(
          createElement(ReservationCanceled, {
            serviceName,
            reservationDetails,
            options,
          }),
        ),
      });
  }
}
