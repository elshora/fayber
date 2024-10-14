import React from "react";
import { useTranslation } from "@/app/i18n";
import { getUsers } from "./actions/actions";
import CoventantData from "./components/CoventantData";

export default async function Index({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  const convenantUsers = await getUsers(1);
  return <CoventantData lng={lng} convenantUsers={convenantUsers} />;
}
