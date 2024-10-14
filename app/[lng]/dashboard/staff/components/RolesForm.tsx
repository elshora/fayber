"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useTranslation } from "@/app/i18n/client";
import { InputField } from "../../components/InputField";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SendHorizontal } from "lucide-react";
import { permissions } from "@/lib/data";
import { useAppDispatch } from "@/lib/hooks";
import { closeDialog } from "@/lib/features/dialog/dialogSlice";


const formSchema = z.object({
  role_name: z.string().min(2, "Role name is required"),
  permissions: z
    .array(z.string())
    .min(1, "At least one permission is required"),
});

type RoleFormProps = {
  lng: string;
  setAllRoles:any
};

export function RolesForm({ lng,setAllRoles }: RoleFormProps) {

  const { t } = useTranslation(lng, "staff");
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const dispatch = useAppDispatch()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_name: "",
      permissions: [],
    },
  });

  const handleSelectAll = () => {
    const allPermissions: any = permissions.map((p) => p.value);
    if (selectAll) {
      form.setValue("permissions", []);
    } else {
      form.setValue("permissions", allPermissions);
    }
    setSelectAll(!selectAll);
  };
  const [selectAll, setSelectAll] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.role_name);
      formData.append("permissions", values.permissions.join(","));
      formData.append("type", "admin");
  
      const response = await axiosAuth.post("/roles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const newRole = {
        id: response.data.id, // Assuming the server returns the new role's ID
        name: values.role_name,
        permissions: values.permissions.join(","), // Store permissions as a comma-separated string
        type: "admin",
      };
  
      // Update the roles list with the new role
      setAllRoles((prevRoles: any) => [...prevRoles, newRole]);
  
      form.reset();
      toast({
        variant: "default",
        description: t("role_added_successfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: t("role_add_failed"),
      });
    } finally {
      setLoading(false);
      dispatch(closeDialog());
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-1">
        <InputField
          inputName={"role_name"}
          control={form.control}
          textLabel={t("role_name_label")}
          placeholder={t("role_name_placeholder")}
        />
        <div>
          <div className="flex justify-between gap-3">
            <h3>{t("select_roles")}</h3>
            <Button
              type="button"
              variant={"link"}
              onClick={handleSelectAll}
              className="mb-4"
            >
              {selectAll ? t("deselect_all") : t("select_all")}
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4   gap-4">
            <TooltipProvider>
              {permissions.map((permission) => (
                <Tooltip key={permission.value}>
                  <TooltipTrigger asChild>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="appearance-none h-5 w-5 border border-gray-300 rounded-md bg-gray-200 checked:bg-green-400 checked:border-green-400 cursor-pointer"
                        value={permission.value}
                        {...form.register("permissions")}
                      />
                      <span className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap w-32">
                        {t(permission.name)}
                      </span>
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t(permission.name)}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
        <div className="flex justify-between gap-3">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              t("loading")
            ) : (
              <span className="flex flex-row gap-2">
                {t("add_role")} <SendHorizontal />
              </span>
            )}
          </Button>
          <Button
            type="button"
            className="w-full"
            variant="outline"
            onClick={() => {
              form.reset()
              dispatch(closeDialog());
            }}
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
