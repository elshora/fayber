"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "../../components/InputField";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import {
  addCategory,
  updateCategory,
} from "@/lib/features/categories/categoriesSlice";
import { useAppDispatch } from "@/lib/hooks";

const formSchema = (t: any) =>
  z.object({
    category_name_ar: z.string().min(2, {
      message: t("category_name_min_length"),
    }),
    category_name_en: z.string().min(2, {
      message: t("category_name_min_length"),
    }),
  });

type CategoryFormProps = {
  lng: string;
  defaultValues?: Category;
  categoryId?: string;
};

export function CategoryForm({
  lng,
  defaultValues,
  categoryId,
}: CategoryFormProps) {
  const { t } = useTranslation(lng, "product");
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const schema = formSchema(t);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      category_name_ar: "",
      category_name_en: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category_name_ar", values.category_name_ar);
      formData.append("category_name_en", values.category_name_en);

      if (categoryId) {
        formData.append("id", categoryId);
        const res = await axiosAuth.put(`/categories`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const updatedCategory = { ...values, category_id: categoryId };
        dispatch(updateCategory(updatedCategory));
        toast({
          variant: "default",
          description: t("category_updated_successfully"),
        });
      } else {
        const res = await axiosAuth.post("/categories", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const newCategory = { ...values, category_id: res.data.id };
        dispatch(addCategory(newCategory));
        toast({
          variant: "default",
          description: t("category_added_successfully"),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: categoryId
          ? t("category_update_failed")
          : t("category_add_failed"),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField
          inputName={"category_name_en"}
          control={form.control}
          textLabel={t("category_name_en_label")}
          placeholder={t("category_name_en_placeholder")}
        />
        <InputField
          inputName={"category_name_ar"}
          control={form.control}
          textLabel={t("category_name_ar_label")}
          placeholder={t("category_name_ar_placeholder")}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? t("loading")
            : categoryId
            ? t("update_category")
            : t("add_category")}
        </Button>
      </form>
    </Form>
  );
}
