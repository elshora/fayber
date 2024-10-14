"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavComponent from "../../components/NavComponent";
import { useTranslation } from "@/app/i18n/client";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { deleteContractor } from "../actions/actions";

export default function ContractorCard({
  lng,
  contractor,
}: {
  lng: string;
  contractor: Contractors;
}) {
  const { t } = useTranslation(lng, "covenant");
  return (
    <Card className="p-3 text-center bg-userCard">
      <CardContent>
        <div className="flex w-full justify-center mb-5 pt-5">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/assets/images/user.png" alt="user" />
            <AvatarFallback>{contractor.name}</AvatarFallback>
          </Avatar>
        </div>
        <h4 className="text-[16px] font-bold">{`${contractor.name}`}</h4>
      </CardContent>
      <CardFooter className="text-center p-0 flex items-center gap-x-2">
        <DeleteConfirmation action={() => deleteContractor(contractor.id)} />
        <Button className="w-1/2">Edit</Button>
      </CardFooter>
    </Card>
  );
}
