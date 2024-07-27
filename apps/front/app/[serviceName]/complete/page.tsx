import NavBar from "@/app/components/common/NavBar";
import { getService } from "@/app/services/getService";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: { params: { serviceName: string } }) {
  const serviceName = params.serviceName;
  const service = await getService(serviceName);
  if (!service) {
    redirect("/");
  }

  return (
    <>
      <NavBar serviceName={serviceName} />
      <main className="flex flex-col items-center gap-8 pt-24 pb-12">
        <p className="font-bold text-2xl">予約が完了しました。</p>
        <a
          href="https://www.saunping.jp/"
          className="relative flex h-12 w-fit items-center justify-center rounded-lg border-2 border-[#2C2C2C] bg-[#2C2C2C] px-4 py-3 font-semibold text-md text-white transition hover:opacity-80"
        >
          ホームに戻る
        </a>
      </main>
    </>
  );
}
