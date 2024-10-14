import { CirclePlus } from "lucide-react";
import React, { Suspense } from "react";
import NavComponent from "../components/NavComponent";
import { useTranslation } from "@/app/i18n";
import StaffData from "./components/StaffData";
import LoadingCards from "../components/LoadingCards";

interface LanguageToggleProps {
  lng: string;
}
export default async function Index({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  const { t } = await useTranslation(lng, "staff");
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex justify-between items-center">
        <NavComponent
          title={t("Add Employee")}
          target={`/${lng}/dashboard/staff/add`}
          Icon={CirclePlus}
        />
      </div>
      <Suspense fallback={<LoadingCards />}>
        <StaffData lng={lng} />
      </Suspense>
    </div>
  );
}
