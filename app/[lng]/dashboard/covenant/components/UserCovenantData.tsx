"use client";
import { useTranslation } from "@/app/i18n/client";
import React from "react";
import UserDetails from "./UserDetails";
import { DialogForm } from "../../components/DialogForm";
import { CirclePlus } from "lucide-react";
import ConvenantForm from "./ConvenantForm";
import ExpensesTable from "./ExpensesTable";

interface ConvenantUser {
  original_cash?: string;
}

export default function UserCovenantData({
  lng,
  userId,
  user,
}: {
  lng: string;
  userId: string;
  user: ConvenantUser;
}) {
  const { t } = useTranslation(lng, "covenant");

  return (
    <div className="w-full flex items-center flex-wrap gap-y-3 justify-between">
      <h4 className="text-[24px] font-normal">{t("employee_data")}</h4>
      <DialogForm
        title={user?.original_cash ? t("update_covenant") : t("add_covenant")}
        Icon={CirclePlus}
        //  @ts-ignore
        FormComponent={<ConvenantForm lng={lng} userId={userId} user={user} />}
      />
      {/* @ts-ignore */}
      <UserDetails lng={lng} user={user} />
      <ExpensesTable />
    </div>
  );
}
