"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavComponent from "../../components/NavComponent";
import { useTranslation } from "@/app/i18n/client";

export default function UserCard({
  lng,
  staffMember,
}: {
  lng: string;
  staffMember: StaffMember;
}) {
  const { t } = useTranslation(lng, "staff");
  return (
    <Card className="p-3 text-center">
      <CardContent>
        <div className="flex w-full justify-center mb-5">
          <Avatar className="w-32 h-32">
            <AvatarImage src={staffMember.picture_url ?? ""} alt="@shadcn" />
            <AvatarFallback>
              {staffMember.username.slice(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <h4>{staffMember.username}</h4>
        <p>{staffMember.job_title}</p>
      </CardContent>
      <CardFooter className="text-center">
        <NavComponent
          target={"/dashboard/staff/" + staffMember.id}
          title={t("Details")}
          classes="w-full justify-center"
        />
      </CardFooter>
    </Card>
  );
}
