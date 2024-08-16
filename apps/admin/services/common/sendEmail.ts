"use server";

import type { RESERVATION_STATUS } from "@/consts/status";
import ReservationCanceledForCustomer from "@/emails/customer/ReservationCanceled";
import ReservationConfirmedForCustomer from "@/emails/customer/ReservationConfirmed";
import InstructorAssigned from "@/emails/instructor/InstructorAssigned";
import InstructorCanceled from "@/emails/instructor/InstructorCanceled";
import ReservationCanceledForInstructor from "@/emails/instructor/ReservationCanceled";
import ReservationUpdated from "@/emails/instructor/ReservationUpdated";
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

type sendEmailToCustomerParams = {
  from: string;
  to: string;
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
}: sendEmailToCustomerParams) {
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

type sendEmailToInstructorParams = {
  from: string;
  to: string;
  name: string;
  serviceName: string;
  type: "ASSIGNED" | "UPDATED" | "CANCELED";
  status: keyof typeof RESERVATION_STATUS;
  customer: { label: string; value: string }[];
  reservationDetails: { label: string; value: string }[];
  options: { label: string; value: string }[];
  instructors: string[];
};

export async function sendEmailToInstructor({
  from,
  to,
  name,
  serviceName,
  type,
  status,
  customer,
  reservationDetails,
  options,
  instructors,
}: sendEmailToInstructorParams) {
  switch (status) {
    case "PENDING":
    case "CONFIRMED":
      switch (type) {
        case "ASSIGNED":
          await sendMail({
            from,
            to,
            subject: `インストラクター通知 - ${serviceName}`,
            html: render(
              createElement(InstructorAssigned, {
                serviceName,
                name: name || "",
                customer,
                reservationDetails,
                options,
                instructors,
              }),
            ),
          });
          break;
        case "UPDATED":
          await sendMail({
            from,
            to,
            subject: `予約更新 - ${serviceName}`,
            html: render(
              createElement(ReservationUpdated, {
                serviceName,
                name: name || "",
                customer,
                reservationDetails,
                options,
                instructors,
              }),
            ),
          });
          break;
        case "CANCELED":
          await sendMail({
            from,
            to,
            subject: `インストラクターキャンセル - ${serviceName}`,
            html: render(
              createElement(InstructorCanceled, {
                serviceName,
                name: name || "",
                customer,
                reservationDetails,
                options,
                instructors,
              }),
            ),
          });
          break;
      }
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
            instructors,
          }),
        ),
      });
      break;
  }
}
