"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "../../components/InputField";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/app/i18n/client";
import { addUnit, updateUnit } from "@/lib/features/units/unitsSlice";
import { useAppDispatch } from "@/lib/hooks";

const formSchema = (t: any) =>
  z.object({
    unit_name_ar: z.string().min(2, {
      message: t("unit_name_ar_min_length"),
    }),
    unit_name_en: z.string().min(2, {
      message: t("unit_name_en_min_length"),
    }),
  });

type UnitFormProps = {
  lng: string;
  defaultValues?: { unit_name_ar: string; unit_name_en: string };
  unitId?: string;
};

export function UnitForm({ lng, defaultValues, unitId }: UnitFormProps) {
  const { t } = useTranslation(lng, "product");
  const [loading, setLoading] = useState(false);
  const schema = formSchema(t);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      unit_name_ar: "",
      unit_name_en: "",
    },
  });
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    const formData = new FormData();
    formData.append("unit_name_ar", values.unit_name_ar);
    formData.append("unit_name_en", values.unit_name_en);

    try {
      if (unitId) {
        formData.append("id", unitId);
        await axiosAuth.put(`/units`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const updatedUnit = { ...values, unit_id: unitId };
        dispatch(updateUnit(updatedUnit));
        toast({
          variant: "default",
          description: t("unit_updated_successfully"),
        });
      } else {
        const res = await axiosAuth.post("/units", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const newUnit = { ...values, unit_id: res.data.id };
        dispatch(addUnit(newUnit));
        toast({
          variant: "default",
          description: t("unit_added_successfully"),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: unitId ? t("unit_update_failed") : t("unit_add_failed"),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField
          inputName={"unit_name_ar"}
          control={form.control}
          textLabel={t("unit_name_ar_label")}
          placeholder={t("unit_name_ar_placeholder")}
        />
        <InputField
          inputName={"unit_name_en"}
          control={form.control}
          textLabel={t("unit_name_en_label")}
          placeholder={t("unit_name_en_placeholder")}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("loading") : unitId ? t("update_unit") : t("add_unit")}
        </Button>
      </form>
    </Form>
  );
}
