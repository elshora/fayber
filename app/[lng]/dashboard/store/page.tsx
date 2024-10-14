import React, { Suspense } from "react";
import { useTranslation } from "@/app/i18n";
import StoresWrapper from "./components/StoresWrapper";
import Loading from "../components/loading";

export default async function Stores({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  const { t } = await useTranslation(lng, "inventory");
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <Suspense fallback={<Loading />}>
        <StoresWrapper lng="lng" />
      </Suspense>
    </div>
  );
}
