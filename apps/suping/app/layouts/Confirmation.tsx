import CheckValues from "@/app/components/confirm/CheckValues";
import ConfirmationActions from "@/app/components/confirm/ConfirmationActions";
import DetailsTable from "@/app/components/confirm/DetailsTable";
import Notes from "@/app/components/confirm/Notes";
import OptionsTable from "@/app/components/confirm/OptionsTable";
import type { Option, OptionService } from "@prisma/client";
import { CircleAlert } from "lucide-react";

type ConfirmationProps = {
  options: (OptionService & {
    option: Option;
  })[];
};

export default function Confirmation({ options }: ConfirmationProps) {
  return (
    <>
      <CheckValues />
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-gray-900 text-xl">内容確認</h2>
        <section className="flex flex-col items-center gap-4">
          <div className="flex w-fit items-center gap-2 rounded-lg border p-4">
            <CircleAlert size={16} />
            <div>
              <h3 className="font-bold">まだ予約は完了していません</h3>
              <p className="text-sm">予約内容を確認してください</p>
            </div>
          </div>
          <p className="text-sm">
            予約申請を完了すると、
            <a
              href="https://www.suping.jp/conditions/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#51b9d9]"
            >
              利用規約
            </a>
            に同意したとみなします。
          </p>
        </section>
        <section>
          <h3 className="font-bold">予約詳細</h3>
          <DetailsTable />
        </section>
        <section>
          <h3 className="font-bold">オプション内容</h3>
          <OptionsTable options={options} />
        </section>
        <section>
          <h3 className="font-bold">予約に関しての注意事項</h3>
          <Notes />
        </section>
        <section>
          <ConfirmationActions />
        </section>
      </div>
    </>
  );
}
