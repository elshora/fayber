import { useTranslation } from "@/app/i18n";
import CategoryWrapper from "../components/CategoryWrapper";
import { Suspense } from "react";
import Loading from "../../components/loading";

export default async function Page({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  return (
    <div className="space-y-5 w-full px-3">
      <Suspense fallback={<Loading />}>
        <CategoryWrapper lng={lng} />
      </Suspense>
    </div>
  );
}
