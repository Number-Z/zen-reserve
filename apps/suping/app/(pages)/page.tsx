import NavBar from "@/app/components/common/NavBar";
import ReservationForm from "@/app/layouts/ReservationForm";
import { getDiscoveryMethods } from "@/app/services/getDiscoveryMethods";
import { getOptionsServices } from "@/app/services/getOptionsServices";
import { getService } from "@/app/services/getService";
import { addHours } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { redirect } from "next/navigation";

export default async function Page() {
  const service = await getService();
  if (!service) {
    redirect("/");
  }

  const minDate = addHours(toZonedTime(new Date(), "Asia/Tokyo"), 48);
  const options = await getOptionsServices();
  const discoveryMethods = await getDiscoveryMethods();

  return (
    <>
      <NavBar />
      <main className="pt-24 pb-12">
        <ReservationForm
          minDate={minDate}
          options={options}
          discoveryMethods={discoveryMethods}
        />
      </main>
    </>
  );
}
