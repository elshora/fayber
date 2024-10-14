"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { InputField } from "../../components/InputField";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/hooks";

const formSchema = (t: any) =>
  z.object({
    inventory_name: z.string().min(2, {
      message: t("inventory_name_min_length"),
    }),
    store_manager: z.string({
      message: t("select_project_manager"),
    }),
    location: z.string().min(2, {
      message: t("location_min_length"),
    }),
    phone_number: z.string().regex(/^\d{11}$/, {
      message: t("phone_number_invalid"),
    }),
  });

type InventoryFormProps = {
  defaultValues?: {
    inventory_name: string;
    store_manager: string;
    location: string;
    phone_number: string;
  };
  inventoryId?: string;
  lng: string;
};

export function InventoryForm({
  defaultValues,
  inventoryId,
  lng,
}: InventoryFormProps) {
  const { t } = useTranslation(lng, "inventory");
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const schema = formSchema(t);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      inventory_name: "",
      store_manager: "",
      location: "",
      phone_number: "",
    },
  });
  const staff = useAppSelector((state) => state.staff.staff);
  const storeManagers = staff.filter((s) => s.job_title == "inventory_manager");
  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    const formData = new FormData();
    formData.append("inventory_name", values.inventory_name);
    formData.append("store_manager", values.store_manager);
    formData.append("location", values.location);
    formData.append("phone_number", values.phone_number);
    try {
      if (inventoryId) {
        await axiosAuth.put(`/store/${inventoryId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          variant: "default",
          description: t("inventory_updated_successfully"),
        });
      } else {
        await axiosAuth.post("/store", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          variant: "default",
          description: t("inventory_added_successfully"),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: inventoryId
          ? t("inventory_update_failed")
          : t("inventory_add_failed"),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField
          inputName={"inventory_name"}
          control={form.control}
          textLabel={t("inventory_name_label")}
          placeholder={t("inventory_name_placeholder")}
        />
        <InputField
          inputName={"location"}
          control={form.control}
          textLabel={t("location_label")}
          placeholder={t("location_placeholder")}
        />
        <InputField
          inputName={"phone_number"}
          control={form.control}
          textLabel={t("phone_number_label")}
          placeholder={t("phone_number_placeholder")}
        />
        <FormField
          control={form.control}
          name="store_manager"
          render={({ field }) => (
            <div>
              <label>{t("store_manager_label")}</label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={t("store_manager_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {storeManagers.length > 0 &&
                    storeManagers.map((staff, i) => (
                      <SelectItem
                        key={i}
                        value={String(staff.id)}
                      >{`${staff.first_name} ${staff.second_name}`}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? t("loading")
            : inventoryId
            ? t("update_inventory")
            : t("add_inventory")}
        </Button>
      </form>
    </Form>
  );
}
