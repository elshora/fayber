"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputField } from "../../components/InputField";
import DateInput from "../../components/DateInput";
import { useState, useEffect } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "@/app/i18n/client";
import { useAppDispatch } from "@/lib/hooks";
import { addProject } from "@/lib/features/projects/projectsSlice";

const formSchema = (t: any) =>
  z.object({
    project_name: z.string().min(2, {
      message: t("project_name_min_length"),
    }),
    staff_id: z.string({
      message: t("please_select_project_manager"),
    }),
    location: z.string().min(2, {
      message: t("location_min_length"),
    }),
    inventory_id: z.string({
      message: t("inventory_name_min_length"),
    }),
    start_date: z.date({
      message: t("start_date_required"),
    }),
  });

interface Staff {
  id: string;
  first_name: string;
  second_name: string;
  job_title: string;
}

interface Store {
  id: string;
  inventory_name: string;
}

export function AddProjectForm({ lng }: LanguageToggleProps) {
  const { t } = useTranslation(lng, "staff");
  const schema = formSchema(t);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      project_name: "",
      location: "",
      inventory_id: "",
      start_date: undefined,
      staff_id: "",
    },
  });

  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [projectManagers, setProjectManagers] = useState<StaffMember[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const dispatch = useAppDispatch();

  // Fetch project managers and stores
  useEffect(() => {
    const fetchProjectManagers = async () => {
      try {
        const response = await axiosAuth.get("/staff");
        const managers = response.data.filter(
          (staff: Staff) => staff.job_title === "project_manager"
        );
        setProjectManagers(managers);
      } catch (error) {
        console.error("Failed to fetch project managers", error);
      }
    };

    const fetchStores = async () => {
      try {
        const response = await axiosAuth.get("/store");
        setStores(response.data);
      } catch (error) {
        console.error("Failed to fetch stores", error);
      }
    };

    fetchProjectManagers();
    fetchStores();
  }, []);

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("project_name", values.project_name);
      formData.append("location", values.location);
      formData.append("inventory_id", values.inventory_id);
      formData.append("start_date", values.start_date.toISOString());
      formData.append("staff_id", values.staff_id);
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const res = await axiosAuth.post("/projects", formData, {
        headers: headers,
      });
      const newProject = { ...values, id: res.data.id };
      dispatch(addProject(newProject));

      toast({
        variant: "default",
        description: t("project_added_successfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: t("project_add_error"),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField
          inputName="project_name"
          control={form.control}
          textLabel={t("project_name")}
          placeholder={t("enter_project_name")}
        />

        <FormField
          control={form.control}
          name="staff_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("project_manager")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_project_manager")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projectManagers.length > 0 &&
                    projectManagers.map((staff) => (
                      // @ts-ignore
                      <SelectItem key={staff.id} value={staff.id}>
                        {`${staff.first_name} ${staff.second_name}`}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <InputField
          inputName="location"
          control={form.control}
          textLabel={t("location")}
          placeholder={t("enter_project_location")}
        />
        <FormField
          control={form.control}
          name="inventory_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("inventory_name")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("enter_inventory_name")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stores.length > 0 &&
                    stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.inventory_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DateInput
          inputName="start_date"
          control={form.control}
          textLabel={t("start_date")}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("loading") : t("add_project")}
        </Button>
      </form>
    </Form>
  );
}
