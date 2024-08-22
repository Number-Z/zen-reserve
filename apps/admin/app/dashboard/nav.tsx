"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { logOut } from "@/lib/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard/reservations", label: "予約一覧" },
  { href: "/dashboard/options", label: "オプション一覧" },
  { href: "/dashboard/unavailable-date-times", label: "予約停止日時一覧" },
  { href: "/dashboard/instructors", label: "インストラクター一覧" },
];

export function Nav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  return (
    <nav
      className={cn(
        "flex w-full items-center justify-between space-x-4",
        className,
      )}
      {...props}
    >
      <section className="flex items-center space-x-4">
        <Link
          href="/dashboard"
          className="font-medium text-sm transition-colors hover:text-primary"
        >
          カレンダー
        </Link>

        <div className="max-w-[200px] flex-grow md:hidden">
          <Select onValueChange={(value) => router.push(value)}>
            <SelectTrigger>
              <SelectValue placeholder="メニュー" />
            </SelectTrigger>
            <SelectContent>
              {navItems.map((item) => (
                <SelectItem key={item.href} value={item.href}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden items-center space-x-4 md:flex lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <form action={logOut}>
        <Button
          type="submit"
          variant="secondary"
          className="font-medium text-sm"
        >
          ログアウト
        </Button>
      </form>
    </nav>
  );
}
