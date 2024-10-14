"use client";import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "../../components/InputField";
import { useTranslation } from "@/app/i18n/client";
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import RadioGroupField from "../../components/RadioField";

const formSchema = (t: any) =>
  z.object({
    name: z.string().min(1, { message: t("name_required") }),
    address: z.string().min(1, { message: t("address_required") }),
    age: z.string().min(1, { message: t("age_required") }),
    national_number: z
      .string()
      .min(1, { message: t("national_number_required") }),
    commercial_register: z
      .string()
      .min(1, { message: t("commercial_register_required") }),
    tax_card: z.string().min(1, { message: t("tax_card_required") }),
    account_number: z
      .string()
      .min(1, { message: t("account_number_required") }),
    payment_method: z
      .string()
      .min(1, { message: t("payment_method_required") }),
    additional_information: z.string().optional(),
  });

export default function ContractorForm({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "contractors");
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const schema = formSchema(t);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      age: "",
      national_number: "",
      commercial_register: "",
      tax_card: "",
      account_number: "",
      payment_method: "",
      additional_information: "",
    },
  });
  const paymenOptions = [
    {
      label: t("cash"),
      value: "cash",
    },
    {
      label: t("mail"),
      value: "mail",
    },
    {
      label: t("bank_transfer"),
      value: "bank_transfer",
    },
  ];
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;
  const onSubmit: SubmitHandler<any> = async (values) => {
    console.log(values);

    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    try {
      setLoading(true);
      const res = await axiosAuth.post("/contractor", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      toast({
        variant: "default",
        description: t("contractor_added_successfully"),
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: t("error_title"),
        description:
          error?.response?.data?.message ?? t("contractor_add_failed"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mb-5">
          <InputField
            inputName={"name"}
            control={control}
            textLabel={t("name_label")}
            className={"bg-userCard"}
          />
          <InputField
            inputName={"address"}
            control={control}
            textLabel={t("address_label")}
            className={"bg-userCard"}
          />
          <InputField
            inputName={"age"}
            control={control}
            textLabel={t("age_label")}
            className={"bg-userCard"}
          />
          <InputField
            inputName={"national_number"}
            control={control}
            textLabel={t("national_number_label")}
            className={"bg-userCard"}
          />
          <InputField
            inputName={"commercial_register"}
            control={control}
            textLabel={t("commercial_register_label")}
            className={"bg-userCard"}
          />
          <InputField
            inputName={"tax_card"}
            control={control}
            textLabel={t("tax_card_label")}
            className={"bg-userCard"}
          />
          <InputField
            inputName={"account_number"}
            control={control}
            textLabel={t("account_number_label")}
            className={"bg-userCard"}
          />
        </div>
        <InputField
          inputType={"textArea"}
          inputName={"additional_information"}
          control={control}
          textLabel={t("additional_information_label")}
          className={"h-[100px] bg-userCard w-full"}
        />
        <div className="mt-10 py-3 border-t">
          <RadioGroupField
            name="payment_method"
            options={paymenOptions}
            control={control}
            label={t("payment_method_label")}
          />
          <div className="w-full flex justify-end">
            <Button
              onClick={() => console.log(errors)}
              type="submit"
              disabled={loading}
              className="bg-green-400 hover:bg-green-600"
            >
              {loading ? t("adding") : t("add_contractor")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
