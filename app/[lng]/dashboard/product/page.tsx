import { useTranslation } from "@/app/i18n";
import { Suspense } from "react";
import Loading from "../components/loading";
import ProductWrapper from "./components/ProductWrapper";
export default async function Index({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  const { t } = await useTranslation(lng, "product");
  return (
    <div className="space-y-5 w-full px-3">
      <Suspense fallback={<Loading />}>
        <ProductWrapper lng={lng} />
      </Suspense>
    </div>
  );
}
