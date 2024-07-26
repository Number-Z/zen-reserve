import Link from "next/link";

type NavBarProps = {
  serviceName: string;
};

export default function NavBar({ serviceName }: NavBarProps) {
  return (
    <header className="fixed z-10 w-full bg-[#2C2C2C] px-4 py-5 shadow-sm sm:px-20">
      <h1>
        <Link href="/" className="font-bold text-2xl text-white">
          {serviceName.toUpperCase()}
        </Link>
      </h1>
    </header>
  );
}
