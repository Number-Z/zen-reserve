import NavBar from "@/app/components/common/NavBar";
import Confirmation from "@/app/layouts/Confirmation";
import { getOptionServices } from "@/app/services/getOptionServices";
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

  const options = await getOptionServices({ serviceName });

  return (
    <>
      <NavBar serviceName={serviceName} />
      <main className="pt-24 pb-12">
        <Confirmation options={options} serviceName={serviceName} />
      </main>
    </>
  );
}
