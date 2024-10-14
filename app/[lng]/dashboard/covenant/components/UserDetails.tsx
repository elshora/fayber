"use client";import { useTranslation } from "@/app/i18n/client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { addCovenant } from "@/lib/features/covenant/covenantSlice";

export default function UserDetails({
  lng,
  user,
}: {
  lng: string;
  user: CovenantDetails | null;
}) {
  const { t } = useTranslation(lng, "convenant");
  const covenant = useAppSelector((state) => state.covenant);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(addCovenant(user?.original_cash));
  }, [dispatch, user?.original_cash]);

  return (
    <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 pb-8 border-b">
      <div>
        <Label htmlFor="Name">Name</Label>
        <Input
          type="text"
          id="Name"
          className="bg-userCard"
          value={`${user?.staff_data?.first_name ?? user?.first_name} ${
            user?.staff_data?.second_name ?? user?.second_name
          }`}
          disabled
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          type="text"
          id="phoneNumber"
          className="bg-userCard"
          value={user?.staff_data?.phone_number ?? user?.phone_number}
          disabled
        />
      </div>
      <div>
        <Label htmlFor="convenant">Covenant</Label>
        <Input
          type="text"
          id="convenant"
          className="bg-userCard"
          value={user?.reminder_cash ?? 0}
          disabled
        />
      </div>
      <div>
        <Label htmlFor="Expenses">Expenses</Label>
        <Input
          type="text"
          id="Expenses"
          value={
            user?.expenses_details
              ? user?.expenses_details[0]
                ? user?.expenses_details[0].amount
                : "No Expenses"
              : "No Expenses"
          }
          className="bg-userCard"
          disabled
        />
      </div>
    </div>
  );
}
