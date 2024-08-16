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
  name: string;
  customer: { label: string; value: string }[];
  reservationDetails: { label: string; value: string }[];
  options: { label: string; value: string }[];
  instructors: string[];
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

export default function InstructorAssigned({
  serviceName,
  name,
  customer,
  reservationDetails,
  options,
  instructors,
}: CompleteProps) {
  switch (serviceName) {
    case "SAUNPING":
      break;
    case "SUPING":
      return (
        <Html lang="ja">
          <Head>
            <title>インストラクター通知 - {serviceName}</title>
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
                  予約確定 - {serviceName}
                </Heading>
                <Text className="mb-4 text-base text-gray-600 leading-relaxed">
                  {name}様
                  <br />
                  {serviceName}のインストラクターになりました。
                  <br />
                  インストラクターは、予約開始30分前には現地で準備をお願いいたします。
                  <br />
                  下記当日の予約内容になります。
                  <br />
                  オプション等の確認、忘れ物がないようにご準備よろしくお願いします。
                  <br />
                  また、着替え用のテントも必ずお持ちください。
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
                  {renderTableRow("インストラクター", instructors.join(", "))}
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
