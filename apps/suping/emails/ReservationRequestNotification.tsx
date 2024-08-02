import { SERVICE_NAME } from "@/app/consts/consts";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Tailwind,
  Text,
} from "@react-email/components";

type CompleteProps = {
  customer: { label: string; value: string }[];
  reservationDetails: { label: string; value: string }[];
  options: { label: string; value: string }[];
};

const renderTableRow = (label: string, value: string) => (
  <tr key={label}>
    <td className="border border-gray-300 border-solid p-2 text-gray-600 text-sm">
      {label}
    </td>
    <td
      className={`border border-gray-300 border-solid p-2 text-gray-600 text-sm ${value !== "なし" ? "font-bold" : ""}`}
    >
      {value}
    </td>
  </tr>
);

export default function ReservationRequestNotification({
  customer,
  reservationDetails,
  options,
}: CompleteProps) {
  return (
    <Html lang="ja">
      <Head>
        <title>予約リクエスト通知 - {SERVICE_NAME}</title>
      </Head>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-xl px-0 py-5">
            <Img
              src="http://www.suping.jp/wp-content/uploads/2024/07/ZEN-ロゴ-1-02.png" // TODO: TBD
              width="42"
              height="42"
              alt={SERVICE_NAME}
              className="h-[42px] w-[42px]"
            />
            <Heading className="pt-4 font-bold text-2xl text-gray-700">
              予約リクエスト通知 - {SERVICE_NAME}
            </Heading>
            <Text className="mb-4 text-base text-gray-600 leading-relaxed">
              下記の内容で予約がリクエストされました。
            </Text>
            <h2 className="font-bold text-gray-700 text-lg">予約者情報</h2>
            <table className="mb-5 w-full border-collapse">
              {customer.map(({ label, value }) => renderTableRow(label, value))}
            </table>
            <h2 className="font-bold text-gray-700 text-lg">予約詳細</h2>
            <table className="mb-5 w-full border-collapse">
              {reservationDetails.map(({ label, value }) =>
                renderTableRow(label, value),
              )}
            </table>
            <h2 className="font-bold text-gray-700 text-lg">オプション内容</h2>
            <table className="mb-5 w-full border-collapse">
              {options.map(({ label, value }) => renderTableRow(label, value))}
            </table>
            <Hr className="my-10 border-gray-300" />
            <Text className="text-gray-500 text-sm">
              {SERVICE_NAME}事務所
              <br />
              高知県高知市内寿町7-10
              <br />
              高知駅から車で約5分
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
