"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputField } from "../../components/InputField";
import { useTranslation } from "@/app/i18n/client";
import { useEffect, useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { DialogForm } from "../../components/DialogForm";
import { CirclePlus } from "lucide-react";
import { RolesForm } from "./RolesForm";

const formSchema = (t: any) =>
  z.object({
    picture: z.instanceof(File).optional(),
    username: z.string().min(2, { message: t("username_min_length") }),
    first_name: z.string().min(2, { message: t("first_name_min_length") }),
    second_name: z.string().min(2, { message: t("second_name_min_length") }),
    phone_number: z
      .string()
      .regex(/^\d{11}$/, { message: t("phone_number_exact_length") }),
    address: z.string().min(5, { message: t("address_min_length") }),
    roles: z.string().min(1, { message: t("roles_required") }),
    job_title: z.enum(["project_manager", "inventory_manager"], {
      message: t("invalid_job_title"),
    }),
    age: z.string(),
    academic_qualifications: z.string(),
    graduation_year: z.string(),
    university: z.string(),
    current_position: z.string(),
    previous_job: z.string(),
    national_id_number: z.string(),
    salary: z.string(),
    additional_information: z.string().optional(),
  });

const defaultValues = {
  id: "",
  username: "",
  first_name: "",
  second_name: "",
  phone_number: "",
  address: "",
  job_title: "project_manager",
  roles: "",
  age: "",
  academic_qualifications: "",
  graduation_year: "",
  university: "",
  current_position: "",
  previous_job: "",
  national_id_number: "",
  salary: "",
  additional_information: "",
};

type EmployeeFormProps = {
  type: "add" | "edit";
  defaultValues?: Partial<z.infer<ReturnType<typeof formSchema>>>;
  lng: string;
  roles: UserRole[];
};

export function EmployeeForm({
  type,
  defaultValues: editValues,
  lng,
  roles,
}: EmployeeFormProps) {
  const { t } = useTranslation(lng, "staff");
  const schema = formSchema(t);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      type === "edit"
        ? ({
            ...editValues,
            roles: editValues?.roles?.[0] as string,
            job_title:
              // @ts-ignore
              editValues?.job_title === "Project Manager"
                ? "project_manager"
                : "inventory_manager",
          } as any)
        : (defaultValues as any),
  });

  const [loading, setLoading] = useState(false);
  const [allRoles, setAllRoles] = useState<any>(roles ?? []);

  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      const method = type === "edit" ? "put" : "post";
      const url =
        type === "edit"
          ? // @ts-ignore
            `/staff?id=${String(editValues?.id ?? "")}`
          : "/staff";
      await axiosAuth({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push(`/${lng}/dashboard/staff`);
      toast({
        variant: "default",
        description: t(
          type === "edit" ? "updated_successfully" : "added_successfully"
        ),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: t("something_went_wrong"),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === "edit") {
      form.reset(editValues);
    }
  }, [type, editValues, form]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{t("employee_data")}</h2>
        <DialogForm
          title={t("Add Role")}
          Icon={CirclePlus}
          FormComponent={<RolesForm lng={lng} setAllRoles={setAllRoles} />}
        />
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              inputName="picture"
              control={form.control}
              textLabel={t("Profile Picture")}
              type="file"
            />
            <InputField
              inputName="username"
              control={form.control}
              textLabel={t("Username")}
              placeholder={t("Enter Username")}
            />
            <InputField
              inputName="first_name"
              control={form.control}
              textLabel={t("First Name")}
              placeholder={t("Enter first name")}
            />
            <InputField
              inputName="second_name"
              control={form.control}
              textLabel={t("Second Name")}
              placeholder={t("Enter second name")}
            />
            <InputField
              inputName="phone_number"
              control={form.control}
              textLabel={t("Phone Number")}
              placeholder={t("Enter phone number")}
            />
            <InputField
              inputName="address"
              control={form.control}
              textLabel={t("Address")}
              placeholder={t("Enter address")}
            />
            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Job Title")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select Job Title")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project_manager">
                        {t("Project Manager")}
                      </SelectItem>
                      <SelectItem value="inventory_manager">
                        {t("Inventory Manager")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <InputField
              inputName="age"
              control={form.control}
              textLabel={t("Age")}
              placeholder={t("Enter age")}
              type="number"
            />
            <InputField
              inputName="academic_qualifications"
              control={form.control}
              textLabel={t("Academic Qualifications")}
              placeholder={t("Enter academic qualifications")}
            />
            <InputField
              inputName="graduation_year"
              control={form.control}
              textLabel={t("Graduation Year")}
              placeholder={t("Enter graduation year")}
            />
            <InputField
              inputName="university"
              control={form.control}
              textLabel={t("University")}
              placeholder={t("Enter university")}
            />
            <InputField
              inputName="current_position"
              control={form.control}
              textLabel={t("Current Position")}
              placeholder={t("Enter current position")}
            />
            <InputField
              inputName="previous_job"
              control={form.control}
              textLabel={t("Previous Job")}
              placeholder={t("Enter previous job")}
            />
            <InputField
              inputName="national_id_number"
              control={form.control}
              textLabel={t("National ID Number")}
              placeholder={t("Enter national ID number")}
            />
            <InputField
              inputName="salary"
              control={form.control}
              textLabel={t("Salary")}
              placeholder={t("Enter salary")}
              type="number"
            />
            <InputField
              inputName="additional_information"
              control={form.control}
              textLabel={t("Additional Information")}
              placeholder={t("Enter additional information")}
            />
          </div>

          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{t("Roles")}</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select Role")} />
                    </SelectTrigger>
                    <SelectContent>
                      {allRoles.map((role: UserRole) => (
                        <SelectItem key={role.id} value={String(role.id)}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />

          <Button type="submit" disabled={loading}>
            {t(type === "edit" ? "Update Employee" : "Add Employee")}
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
