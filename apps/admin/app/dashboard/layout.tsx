import { Nav } from "@/app/dashboard/nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Nav />
        </div>
      </div>
      <main className="flex-1 space-y-4 p-2 md:px-8 md:pt-6">{children}</main>
    </div>
  );
}
