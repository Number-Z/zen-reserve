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

export default function ReservationRequested({
  customer,
  reservationDetails,
  options,
}: CompleteProps) {
  return (
    <Html lang="ja">
      <Head>
        <title>予約リクエスト完了 - {SERVICE_NAME}</title>
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
              予約リクエスト完了 - {SERVICE_NAME}
            </Heading>
            <Text className="mb-4 text-base text-gray-600 leading-relaxed">
              この度は{SERVICE_NAME}
              をご利用くださいまして誠にありがとうございます。
              <br />
              下記の通りご予約のリクエストをお受けいたしましたのでご確認をお願いいたします。
              <br />
              予約リクエストが承認されましたら、ご予約確定のメールをお送りいたします。
              <br />
              なお、予約変更、キャンセルにつきましては公式LINEよりお問い合わせください。
              <br />
              <br />
              また、自己都合による前日、当日キャンセルに関しましては、キャンセル料として100%お支払いになりますのであらかじめご了承ください（人数変更等は可能です）。
              <br />
              ※雨天の場合、前日にお電話もしくはショートメッセージにてご連絡いたします。
              <br />
              <br />
              ※必ず一読ください。
              <br />
              ツアー開始15分前には現地集合をお願いお願いいたします。
              <br />
              集合場所（Googleマップ）
              <br />
              https://www.google.com/maps?ll=33.570017,133.322614&z=17&t=h&hl=ja&gl=JP&mapclient=embed&q=33%C2%B034%2714.1%22N+133%C2%B019%2725.1%22E+33.570583,+133.323639@33.5705833,133.3236389
              <br />
              <br />
              現地にはトイレがございませんので、水辺の駅
              あいの里であらかじめお済ませいただくことをお勧めいたします。
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
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
