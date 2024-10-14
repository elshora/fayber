import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form"; // Ensure FormField is imported
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { InputField } from "../../components/InputField";

const formSchema = (t: any) =>
  z.object({
    project_id: z.string().nonempty({
      message: t("project_id_required"),
    }),
    type: z.string().nonempty({
      message: t("type_required"),
    }),
    contractor_id: z.string().nonempty({
      message: t("contractor_required"),
    }),
    store_id: z.string().nonempty({
      message: t("contractor_required"),
    }),
    order_note: z.string().optional(),
    product_quantity_dict: z.record(z.string(), z.number()).optional(),
  });

type OrderFormProps = {
  lng: string;
  defaultValues?: any;
  orderId?: string;
  setOrders: (orders: any) => void;
};

export function OrderForm({
  lng,
  defaultValues,
  orderId,
  setOrders,
}: OrderFormProps) {
  const { t } = useTranslation(lng, "order");
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const schema = formSchema(t);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      project_id: "",
      type: "",
      contractor_id: "",
      order_note: "",
      store_id:"",
      product_quantity_dict: {},
    },
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [storesResponse, projectsResponse, contractorsResponse] =
          await Promise.all([
            axiosAuth.get("/store"),
            axiosAuth.get("/projects?state=all"),
            axiosAuth.get("/contractor"),
          ]);

        setStores(storesResponse.data);
        setProjects(projectsResponse.data);
        setContractors(contractorsResponse.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("error_title"),
          description: t("data_fetch_failed"),
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [axiosAuth, t, toast]);

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("project_id", values.project_id);
      formData.append("type", values.type);
      formData.append("contractor_id", values.contractor_id); 
      formData.append("store_id", values.store_id); 
      formData.append("order_note", values.order_note || "");
      formData.append(
        "product_quantity_dict",
        JSON.stringify(values.product_quantity_dict || {})
      );

      if (orderId) {
        formData.append("id", orderId);
        const response = await axiosAuth.put(`/api/user_orders`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setOrders((prevOrders: any) =>
          prevOrders.map((order: any) =>
            order.order_id === orderId ? response.data : order
          )
        );
        toast({
          variant: "default",
          description: t("order_updated_successfully"),
        });
      } else {
        const response = await axiosAuth.post("/api/user_orders", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setOrders((prevOrders: any) => [...prevOrders, response.data]);
        toast({
          variant: "default",
          description: t("order_added_successfully"),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: orderId ? t("order_update_failed") : t("order_add_failed"),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="project_id"
          render={({ field }) => (
            <div>
              <label>{t("project_id_label")}</label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={t("project_id_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {projects.length > 0 &&
                    projects.map((project, i) => (
                      <SelectItem key={i} value={project.id}>
                        {project.project_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <InputField
          inputName={"type"}
          control={form.control}
          textLabel={t("type_label")}
          placeholder={t("type_placeholder")}
        />
        <FormField
          control={form.control}
          name="contractor_id"
          render={({ field }) => (
            <div>
              <label>{t("contractor_label")}</label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={t("contractor_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {contractors.length > 0 &&
                    contractors.map((contractor, i) => (
                      <SelectItem
                        key={i}
                        value={contractor.id}
                      >{`${contractor.first_name} ${contractor.last_name}`}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <InputField
          inputName={"order_note"}
          control={form.control}
          textLabel={t("order_note_label")}
          placeholder={t("order_note_placeholder")}
        />
        <FormField
          control={form.control}
          name="store_id"
          render={({ field }) => (
            <div>
              <label>{t("store_manager_label")}</label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={t("store_manager_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {stores.length > 0 &&
                    stores.map((s, i) => (
                      <SelectItem
                        key={i}
                        value={s.id}
                      >{`${s.inventory_name}`}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? t("loading")
            : orderId
            ? t("update_order")
            : t("add_order")}
        </Button>
      </form>
    </Form>
  );
}
