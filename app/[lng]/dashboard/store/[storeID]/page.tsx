import { useTranslation } from "@/app/i18n";
import { Suspense } from "react";
import StoreWrapper from "../components/StoreWrapper";
import Loading from "../../components/loading";

type Params = {
  params: {
    storeid: string;
    lng: string;
  };
};

// export async function generateMetadata({
//   params: { eventId },
// }: Params): Promise<Metadata> {
//   const eventData: Promise<EVENT> = getEvent(eventId);
//   const singleEvent: EVENT = await eventData;

//   return {
//     title: singleEvent.title,
//     description: `This is the page of ${singleEvent.description}`,
//   };
// }

export default async function Index({ params: { lng, storeid } }: Params) {
  const { t } = await useTranslation("projects");
  return (
    <>
      <div className="space-y-5 w-full px-3">
        <div className="flex gap-4">{/* <DownloadButton /> */}</div>
        <h1>{storeid}</h1>
        <Suspense fallback={<Loading />}>
          <StoreWrapper lng={lng} storeid={storeid} />
        </Suspense>
      </div>
    </>
  );
}
