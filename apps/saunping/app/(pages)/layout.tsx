import FormProvider from "@/app/components/common/FormProvider";
import { SERVICE_NAME } from "@/app/consts/consts";
import type { Metadata } from "next";
import "@/app/(pages)/globals.css";

export const metadata: Metadata = {
  title: `${SERVICE_NAME} 予約サイト`,
  description: `${SERVICE_NAME} 予約サイト`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
