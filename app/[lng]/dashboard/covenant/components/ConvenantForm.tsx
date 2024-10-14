"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";
import { toast } from "@/components/ui/use-toast";
import { addCovenant, updateCovenant } from "../actions/actions";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";

const initialState = {
  covenant: [""],
};
export default function ConvenantForm({
  lng,
  userId,
  user,
}: {
  lng: string;
  userId: string;
  user: CovenantDetails;
}) {
  const method = user?.original_cash ? "put" : "post";
  const { t } = useTranslation(lng, "covenant");
  const updateCovenantAction = updateCovenant.bind(null, user.id);
  const addCovenantAction = addCovenant.bind(null, userId);
  const [state, formAction] = useFormState(updateCovenantAction, initialState);
  useEffect(() => {
    console.log(state?.covenant);
  }, [state]);

  return (
    <form
      action={method === "post" ? addCovenantAction : updateCovenantAction}
      className="space-y-8"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="covenant">Covenant</Label>
        <Input
          type="number"
          id="covenant"
          name="covenant"
          placeholder="Enter covenant value"
          className={"bg-userCard"}
          defaultValue={user?.reminder_cash}
          required
          min={0}
        />
        <p>{state?.covenant}</p>
      </div>
      {method === "post" && (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="covenant">Notes</Label>
          <Textarea
            name={"note"}
            placeholder={t("add_notes")}
            className={"h-[100px] bg-userCard"}
          />
        </div>
      )}
      <SubmitButton method={method} t={t} />
    </form>
  );
}
function SubmitButton({ method, t }: { method: string; t: any }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending
        ? t("loading")
        : method === "put"
        ? t("update_covenant")
        : t("add_covenant")}
    </Button>
  );
}
