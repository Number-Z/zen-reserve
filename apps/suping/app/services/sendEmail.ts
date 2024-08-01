"use server";

import { SERVICE_NAME } from "@/app/consts/consts";
import ReservationRequested from "@/emails/ReservationRequested";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { createElement } from "react";
import ReservationRequestNotification from "../../../saunping/emails/ReservationRequestNotification";

type EmailPayload = {
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

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data,
  });
};

type SendEmailParams = {
  to: string;
  customer: { label: string; value: string }[];
  reservationDetails: { label: string; value: string }[];
  options: { label: string; value: string }[];
};

export async function sendEmail({
  to,
  customer,
  reservationDetails,
  options,
}: SendEmailParams) {
  await sendMail({
    to,
    subject: `予約リクエスト完了 - ${SERVICE_NAME}`,
    html: render(
      createElement(ReservationRequested, {
        customer,
        reservationDetails,
        options,
      }),
    ),
  });
}

export async function sendEmailForAdmin({
  to,
  customer,
  reservationDetails,
  options,
}: SendEmailParams) {
  await sendMail({
    to,
    subject: `予約リクエスト通知 - ${SERVICE_NAME}`,
    html: render(
      createElement(ReservationRequestNotification, {
        customer,
        reservationDetails,
        options,
      }),
    ),
  });
}
