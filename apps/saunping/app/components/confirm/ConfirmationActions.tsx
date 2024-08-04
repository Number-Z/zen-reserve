"use client";

import Button from "@/app/components/common/Button";
import Loading from "@/app/components/common/Loading";
import { createReservation } from "@/app/services/createReservation";
import type { IFormInput } from "@/app/types/IFormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useFormContext } from "react-hook-form";

export default function ConfirmationActions() {
  const router = useRouter();

  const [isAgreed, setIsAgreed] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { getValues } = useFormContext<IFormInput>();
  const values = getValues();
  const createReservationWithValues = createReservation.bind(null, values);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await createReservationWithValues(formData);
        router.push("/complete");
      } catch (error) {
        console.error(error);
      }
    });
  };
  return (
    <section>
      <div className="flex flex-col gap-4 bg-white p-4">
        <p className="text-center text-xs">
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
              disabled={isPending}
              onChange={() => setIsAgreed(!isAgreed)}
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
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
            <Link
              href="/"
              aria-disabled={isPending}
              tabIndex={isPending ? -1 : 0}
              className={`relative flex h-12 w-full items-center justify-center rounded-lg border-2 border-[#2C2C2C] bg-[#2C2C2C] py-3 font-semibold text-md text-white transition hover:opacity-80 ${isPending ? "pointer-events-none cursor-not-allowed opacity-70" : ""}`}
            >
              戻る
            </Link>
          </div>
          <div className="col-span-2 w-full">
            <form action={handleSubmit}>
              <Button type="submit" disabled={!isAgreed || isPending}>
                {isPending ? <Loading /> : "予約する"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
