import React, { Suspense } from "react";
import DownloadButton from "../../components/DownloadButton";
import { useTranslation } from "@/app/i18n";
import CompletedProjectWrapper from "../components/CompletedProjectWrapper";

export default async function Index({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  const { t } = await useTranslation(lng, "projects");

  return (
    <div className="space-y-5 w-full px-3">
      <div className="flex justify-between items-center">
        <h3>{t("Completed Projects")}</h3>
        <div className="flex gap-3">
          <DownloadButton
            endpoint="/projects?state=completed"
            title={"completed-projects"}
            lng={lng}
          />
        </div>
      </div>
      <Suspense>
        <CompletedProjectWrapper lng={lng} />
      </Suspense>
    </div>
  );
}
