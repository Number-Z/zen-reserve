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
  serviceName: string;
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

export default function ReservationCanceled({
  serviceName,
  customer,
  reservationDetails,
  options,
}: CompleteProps) {
  switch (serviceName) {
    case "SAUNPING":
      return (
        <Html lang="ja">
          <Head>
            <title>予約キャンセル - {serviceName}</title>
          </Head>
          <Tailwind>
            <Body className="bg-white font-sans">
              <Container className="mx-auto max-w-xl px-0 py-5">
                <Img
                  src="https://www.saunping.jp/wp-content/uploads/2023/09/S__16113680-removebg-preview.png" // TODO: TBD
                  width="42"
                  height="42"
                  alt={serviceName}
                  className="h-[42px] w-[42px]"
                />
                <Heading className="pt-4 font-bold text-2xl text-gray-700">
                  予約キャンセル - {serviceName}
                </Heading>
                <Text className="mb-4 text-base text-gray-600 leading-relaxed">
                  この度は{serviceName}
                  をご利用くださいまして誠にありがとうございます。
                  <br />
                  下記のご予約のキャンセルが承認されましたのでご確認をお願いいたします。
                </Text>
                <h2 className="font-bold text-gray-700 text-lg">予約者情報</h2>
                <table className="mb-5 w-full border-collapse">
                  {customer.map(({ label, value }) =>
                    renderTableRow(label, value),
                  )}
                </table>
                <h2 className="font-bold text-gray-700 text-lg">予約詳細</h2>
                <table className="mb-5 w-full border-collapse">
                  {reservationDetails.map(({ label, value }) =>
                    renderTableRow(label, value),
                  )}
                </table>
                <h2 className="font-bold text-gray-700 text-lg">
                  オプション内容
                </h2>
                <table className="mb-5 w-full border-collapse">
                  {options.map(({ label, value }) =>
                    renderTableRow(label, value),
                  )}
                </table>
                <Hr className="my-10 border-gray-300" />
                <Text className="text-gray-500 text-sm">
                  {serviceName}事務所
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
    case "SUPING":
      return (
        <Html lang="ja">
          <Head>
            <title>予約キャンセル - {serviceName}</title>
          </Head>
          <Tailwind>
            <Body className="bg-white font-sans">
              <Container className="mx-auto max-w-xl px-0 py-5">
                <Img
                  src="http://www.suping.jp/wp-content/uploads/2024/07/ZEN-ロゴ-1-02.png" // TODO: TBD
                  width="42"
                  height="42"
                  alt={serviceName}
                  className="h-[42px] w-[42px]"
                />
                <Heading className="pt-4 font-bold text-2xl text-gray-700">
                  予約キャンセル - {serviceName}
                </Heading>
                <Text className="mb-4 text-base text-gray-600 leading-relaxed">
                  この度は{serviceName}
                  をご利用くださいまして誠にありがとうございます。
                  <br />
                  下記のご予約のキャンセルが承認されましたのでご確認をお願いいたします。
                </Text>
                <h2 className="font-bold text-gray-700 text-lg">予約者情報</h2>
                <table className="mb-5 w-full border-collapse">
                  {customer.map(({ label, value }) =>
                    renderTableRow(label, value),
                  )}
                </table>
                <h2 className="font-bold text-gray-700 text-lg">予約詳細</h2>
                <table className="mb-5 w-full border-collapse">
                  {reservationDetails.map(({ label, value }) =>
                    renderTableRow(label, value),
                  )}
                </table>
                <h2 className="font-bold text-gray-700 text-lg">
                  オプション内容
                </h2>
                <table className="mb-5 w-full border-collapse">
                  {options.map(({ label, value }) =>
                    renderTableRow(label, value),
                  )}
                </table>
                <Hr className="my-10 border-gray-300" />
              </Container>
            </Body>
          </Tailwind>
        </Html>
      );
    default:
      return null;
  }
}
