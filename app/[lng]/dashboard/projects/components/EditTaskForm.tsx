"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "../../components/InputField";
import DateInput from "../../components/DateInput";
const formSchema = z.object({
  task: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  startDate: z.date({
    message: "Start date is required.",
  }),
  endDate: z.date({
    message: "Start date is required.",
  }),
});

export function EditTaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputField
          inputName={"task"}
          control={form.control}
          textLabel={"Task"}
          placeholder={"Enter Task"}
        />
        <DateInput
          inputName={"startDate"}
          control={form.control}
          textLabel={"Start date"}
        />
        <DateInput
          inputName={"endDate"}
          control={form.control}
          textLabel={"End date"}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
