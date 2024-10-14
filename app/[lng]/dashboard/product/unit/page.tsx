import { useTranslation } from "@/app/i18n";
import { Suspense } from "react";
import Loading from "../../components/loading";
import UnitWrapper from "../components/UnitWrapper";

export default async function Page({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  return (
    <div className="space-y-5 w-full px-3">
      <Suspense fallback={<Loading />}>
        <UnitWrapper lng={lng} />
      </Suspense>
    </div>
  );
}
