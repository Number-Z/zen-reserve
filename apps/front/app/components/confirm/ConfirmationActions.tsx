"use client";

import Button from "@/app/components/common/Button";
import { useState } from "react";

export default function ConfirmationActions() {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <section>
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
          <label
            htmlFor="terms"
            className="inline-flex cursor-pointer items-center"
          >
            <input
              id="terms"
              type="checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 font-medium text-gray-900 text-sm">
              利用規約に同意する
            </span>
          </label>
        </div>
      </div>
      <div className="flex p-2">
        <div className="mx-auto grid w-full grid-cols-4 gap-4 p-4 md:w-1/2">
          <div className="col-span-2 w-full">
            <Button type="button">戻る</Button>
          </div>
          <div className="col-span-2 w-full">
            <Button type="button" disabled={!isAgreed}>
              予約する
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
