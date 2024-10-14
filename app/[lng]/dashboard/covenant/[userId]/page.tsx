import { useTranslation } from "@/app/i18n";
import { getUserById } from "../actions/actions";
import UserCovenantData from "../components/UserCovenantData";
export default async function Index({
  params: { lng, userId },
}: {
  params: { lng: string; userId: string };
}) {
  const user = await getUserById(userId);
  const { t } = await useTranslation(lng, "convenant");
  return <UserCovenantData lng={lng} user={user} userId={userId} />;
}
