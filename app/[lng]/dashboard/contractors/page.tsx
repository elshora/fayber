import { useTranslation } from "@/app/i18n";
import { getContractors } from "./actions/actions";
import ContractorCard from "./components/ContractorCard";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
export default async function Page({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  const { t } = await useTranslation(lng, "contractors");
  const contarctors = await getContractors(1);
  return (
    <div>
      <div className="mb-3 w-full flex items-center flex-wrap gap-y-3 justify-between">
        <Link
          className="ps-5 py-2 pe-8 bg-primary rounded-md text-white"
          href={`/${lng}/dashboard/contractors/add`}
        >
          <div className="flex gap-x-1 items-center">
            <CirclePlus />
            <p>{t("add_contractor")}</p>
          </div>
        </Link>
      </div>
      {contarctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {contarctors.map((user, i) => (
            <div key={i}>
              <ContractorCard lng={lng} contractor={user} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          There is no data
        </div>
      )}
    </div>
  );
}
