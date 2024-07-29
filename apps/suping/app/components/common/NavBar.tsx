import { SERVICE_NAME } from "@/app/consts/consts";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="fixed z-10 w-full bg-[#2C2C2C] px-4 py-5 shadow-sm sm:px-20">
      <h1>
        <Link href="/" className="font-bold text-2xl text-white">
          {SERVICE_NAME}
        </Link>
      </h1>
    </header>
  );
}
