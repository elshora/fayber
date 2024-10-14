import { useTranslation } from "@/app/i18n";

export default async function Index({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  const { t } = await useTranslation(lng, "projects");
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      {t("project order")}
    </div>
  );
}
