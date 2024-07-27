import NavBar from "@/app/components/common/NavBar";
import ReservationForm from "@/app/layouts/ReservationForm";
import { getDiscoveryMethods } from "@/app/services/getDiscoveryMethods";
import { getOptionServices } from "@/app/services/getOptionServices";
import { getService } from "@/app/services/getService";
import { addHours } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: { params: { serviceName: string } }) {
  const serviceName = params.serviceName;
  const service = await getService(serviceName);
  if (!service) {
    redirect("/");
  }

  const minDate = addHours(toZonedTime(new Date(), "Asia/Tokyo"), 48);
  const options = await getOptionServices({ serviceName });
  const discoveryMethods = await getDiscoveryMethods();

  return (
    <>
      <NavBar serviceName={serviceName} />
      <main className="pt-24 pb-12">
        <ReservationForm
          serviceName={serviceName}
          minDate={minDate}
          options={options}
          discoveryMethods={discoveryMethods}
        />
      </main>
    </>
  );
}
