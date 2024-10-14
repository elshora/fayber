"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "../../components/InputField";
import DateInput from "../../components/DateInput";
import { useTranslation } from "@/app/i18n/client";
import { useState } from "react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/lib/hooks";
import { addTask, updateTask } from "@/lib/features/tasks/tasksSlice";

const formSchema = (t: any) =>
  z.object({
    task_body: z.string().min(2, {
      message: t("task_body_min_length"),
    }),
    start_date: z.date({
      message: t("start_date_required"),
    }),
    end_date: z.date({
      message: t("end_date_required"),
    }),
  });

interface TaskFormProps {
  lng: string;
  projectid?: string;
  defaultValues?: {
    task_body: string;
    start_date: Date;
    end_date: Date;
  };
  taskId?: string;
}

export function AddTaskForm({
  lng,
  projectid = "",
  defaultValues,
  taskId,
}: TaskFormProps) {
  const { t } = useTranslation(lng, "tasks");
  const schema = formSchema(t);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      task_body: "",
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("task_body", values.task_body);
      formData.append("start_date", values.start_date.toISOString());
      formData.append("end_date", values.end_date.toISOString());
      if (taskId) {
        formData.append("id", taskId);
        const res = await axiosAuth.put(`/task`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const updatedTask = { ...values, id: taskId };
        dispatch(updateTask(updatedTask));
        toast({
          variant: "default",
          description: t("task_updated_successfully"),
        });
      } else {
        formData.append("project_id", projectid);
        const res = await axiosAuth.post("/task", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(addTask(res.data));
        toast({
          variant: "default",
          description: t("task_added_successfully"),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: taskId ? t("task_update_failed") : t("task_add_failed"),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField
          inputName="task_body"
          control={form.control}
          textLabel={t("task_body")}
          placeholder={t("enter_task_body")}
        />
        <DateInput
          inputName="start_date"
          control={form.control}
          textLabel={t("start_date")}
        />
        <DateInput
          inputName="end_date"
          control={form.control}
          textLabel={t("end_date")}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("loading") : taskId ? t("update_task") : t("add_task")}
        </Button>
      </form>
    </Form>
  );
}
