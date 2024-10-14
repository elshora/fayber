import { redirect } from "next/navigation";
export default async function Page() {
  redirect("/dashboard/orders?pageNumber=1");
  return <></>;
}
