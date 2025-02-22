import NavBar from "@/app/components/common/NavBar";
import Confirmation from "@/app/layouts/Confirmation";
import { getOptionsServices } from "@/app/services/getOptionsServices";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const optionsServices = await getOptionsServices();

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-4xl pt-24 pb-12">
        <Confirmation optionsServices={optionsServices} />
      </main>
    </>
  );
}
