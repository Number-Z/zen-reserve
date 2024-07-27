import NavBar from "@/app/components/common/NavBar";
import Confirmation from "@/app/layouts/Confirmation";
import { getOptionsServices } from "@/app/services/getOptionsServices";
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

  const options = await getOptionsServices({ serviceName });

  return (
    <>
      <NavBar serviceName={serviceName} />
      <main className="mx-auto max-w-4xl pt-24 pb-12">
        <Confirmation options={options} serviceName={serviceName} />
      </main>
    </>
  );
}
