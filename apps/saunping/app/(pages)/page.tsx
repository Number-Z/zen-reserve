import NavBar from "@/app/components/common/NavBar";
import ReservationForm from "@/app/layouts/ReservationForm";
import { getDiscoveryMethods } from "@/app/services/getDiscoveryMethods";
import { getOptionsServices } from "@/app/services/getOptionsServices";
import { getUnavailableDateTimes } from "@/app/services/getUnavailableDateTimes";
import { addHours } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const minDate = addHours(toZonedTime(new Date(), "Asia/Tokyo"), 48);
  const optionsServices = await getOptionsServices();
  const discoveryMethods = await getDiscoveryMethods();
  const unavailableDateTimes = await getUnavailableDateTimes();

  return (
    <>
      <NavBar />
      <main className="pt-24 pb-12">
        <ReservationForm
          minDate={minDate}
          optionsServices={optionsServices}
          discoveryMethods={discoveryMethods}
          unavailableDateTimes={unavailableDateTimes}
        />
      </main>
    </>
  );
}
