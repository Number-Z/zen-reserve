import Link from "next/link";

import { logOut } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function Nav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="font-medium text-sm transition-colors hover:text-primary"
      >
        ダッシュボード
      </Link>
      <Link
        href="/dashboard/reservations"
        className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
      >
        予約一覧
      </Link>
      <form action={logOut}>
        <button
          type="submit"
          className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
        >
          ログアウト
        </button>
      </form>
    </nav>
  );
}
