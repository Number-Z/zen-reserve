"use server";

import ReservationRequested from "@/emails/ReservationRequested";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { createElement } from "react";

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
  serviceName: string;
  reservationDetails: { label: string; value: string }[];
  options: { label: string; value: string }[];
};

export async function sendEmail({
  to,
  serviceName,
  reservationDetails,
  options,
}: SendEmailParams) {
  await sendMail({
    to,
    subject: `予約リクエスト完了 - ${serviceName.toUpperCase()}`,
    html: render(
      createElement(ReservationRequested, {
        serviceName,
        reservationDetails,
        options,
      }),
    ),
  });
}
