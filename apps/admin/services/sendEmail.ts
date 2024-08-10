"use server";

import type { RESERVATION_STATUS } from "@/consts/status";
import ReservationCanceledForCustomer from "@/emails/customer/ReservationCanceled";
import ReservationConfirmedForCustomer from "@/emails/customer/ReservationConfirmed";
import ReservationCanceledForInstructor from "@/emails/instructor/ReservationCanceled";
import ReservationConfirmedForInstructor from "@/emails/instructor/ReservationConfirmed";
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
  name?: string;
  serviceName: string;
  status: keyof typeof RESERVATION_STATUS;
  customer: { label: string; value: string }[];
  reservationDetails: { label: string; value: string }[];
  options: { label: string; value: string }[];
};

export async function sendEmailToCustomer({
  from,
  to,
  serviceName,
  status,
  customer,
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
          createElement(ReservationConfirmedForCustomer, {
            serviceName,
            customer,
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
          createElement(ReservationCanceledForCustomer, {
            serviceName,
            customer,
            reservationDetails,
            options,
          }),
        ),
      });
      break;
    default:
      break;
  }
}

export async function sendEmailToInstructor({
  from,
  to,
  name,
  serviceName,
  status,
  customer,
  reservationDetails,
  options,
}: SendEmailParams) {
  switch (status) {
    case "CONFIRMED":
      await sendMail({
        from,
        to,
        subject: `インストラクター通知 - ${serviceName}`,
        html: render(
          createElement(ReservationConfirmedForInstructor, {
            serviceName,
            name: name || "",
            customer,
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
          createElement(ReservationCanceledForInstructor, {
            serviceName,
            name: name || "",
            customer,
            reservationDetails,
            options,
          }),
        ),
      });
      break;
    default:
      break;
  }
}
