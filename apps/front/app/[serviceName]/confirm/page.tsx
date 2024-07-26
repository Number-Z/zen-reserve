import NavBar from "@/app/components/common/NavBar";
import SummaryTable from "@/app/components/confirm/SummaryTable";
import { CircleAlert } from "lucide-react";

export default async function Page({
  params,
}: { params: { serviceName: string } }) {
  const serviceName = params.serviceName;

  return (
    <>
      <NavBar serviceName={serviceName} />
      <main className="flex flex-col items-center py-24">
        <h2 className="font-bold text-gray-900 text-xl">内容確認</h2>
        <div className="flex flex-col items-center gap-8">
          <article className="m-4 flex w-fit items-center gap-2 rounded-lg border p-4">
            <CircleAlert size={16} />
            <div>
              <h3 className="font-bold">まだ予約は完了していません</h3>
              <p className="text-muted-foreground">
                予約内容を確認してください
              </p>
            </div>
          </article>
          <p className="text-xs">
            予約申請を完了すると、
            <a
              href="https://www.saunping.jp/conditions/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#51b9d9]"
            >
              利用規約
            </a>
            に同意したとみなします。
          </p>
        </div>
        <SummaryTable />
        {/* <div className="w-full mx-auto">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-5 md:gap-10 mt-4 px-0 sm:px-24">
            <div className="order-first mb-10 md:col-span-3 md:col-start-2">
              <h2 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
                内容確認
              </h2>
              <div className="bg-white p-4">
                <div className="flex justify-center bg-white">
                  <Alert variant="destructive" className="m-4 w-fit">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-bold">
                      まだ予約は完了していません
                    </AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      予約内容を確認してください
                    </AlertDescription>
                  </Alert>
                </div>
                <p className="my-4 whitespace-pre-wrap text-xs">
                  予約申請を完了すると、
                  <a
                    href="https://www.saunping.jp/conditions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#51b9d9]"
                  >
                    利用規約
                  </a>
                  に同意したとみなします。
                </p>
                <h3 className="font-bold mt-4">予約詳細</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>項目</TableHead>
                      <TableHead>内容</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">予約日</TableCell>
                      <TableCell>
                        {reservationDate
                          ? format(reservationDate, "yyyy年MM月dd日")
                          : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">予約時刻</TableCell>
                      <TableCell>
                        {reservationTime
                          ? format(reservationTime, "HH:mm")
                          : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">金額</TableCell>
                      <TableCell>{totalPrice}円</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">支払い方法</TableCell>
                      <TableCell>現地払い</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <h3 className="font-bold mt-4">オプション内容</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>項目</TableHead>
                      <TableHead>内容</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {optionFields.map((field) => (
                      <TableRow key={field.id}>
                        <TableCell className="font-medium">
                          {field.label}
                        </TableCell>
                        <TableCell>
                          {reservationOptionInfo[field.dataId] &&
                          Number.parseInt(reservationOptionInfo[field.dataId]) >
                            0
                            ? field.type === "checkbox"
                              ? "あり"
                              : reservationOptionInfo[field.dataId]
                            : "なし"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <h2 className="p-4 text-lg font-bold">予約に関しての注意事項</h2>
              <div className="p-4">
                <Alert className="flex flex-col gap-4 p-4">
                  <div>
                    <AlertTitle className="font-bold">
                      予約の受付締切
                    </AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      1日前の18時まで
                    </AlertDescription>
                  </div>
                  <div>
                    <AlertTitle className="font-bold">日程変更</AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      1日前の18時まで
                    </AlertDescription>
                  </div>
                  <div>
                    <AlertTitle className="font-bold">キャンセル</AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      1日前の18時まで
                    </AlertDescription>
                  </div>
                </Alert>
              </div>

              <div className="flex flex-col gap-4 bg-white p-4">
                <p className="text-xs">
                  このサービスの予約を進めるには、サービス提供者の
                  <a
                    href="https://www.saunping.jp/conditions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#51b9d9]"
                  >
                    利用規約
                  </a>
                  に同意する必要があります。
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <Checkbox
                    id="terms"
                    onCheckedChange={(checked) => setIsAgree(checked === true)}
                  />
                  <label htmlFor="terms" className="text-sm font-medium">
                    利用規約に同意する
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-2">
          <div className="grid w-full grid-cols-4 gap-4 p-4 md:w-1/2 mx-auto">
            <div className="col-span-2 w-full">
              <Button label="戻る" onClick={onBack} />
            </div>
            <div className="col-span-2 w-full">
              <Button
                label="予約する"
                disabled={disabled || !isAgree}
                onClick={handleConfirm}
              />
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="fixed w-full h-full bg-black bg-opacity-30 top-0 left-0 z-40">
            <Loader />
          </div>
        )}
      </div> */}
      </main>
    </>
  );
}
