"use client";
import React, { useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import AgGridTable from "../../components/AgGridTable";
import { DialogForm } from "../../components/DialogForm";
import { CirclePlus, Edit, MapPin, Trash } from "lucide-react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { addAllSTasks, removeTask } from "@/lib/features/tasks/tasksSlice";
import { Button } from "@/components/ui/button";
import { AddTaskForm } from "./AddTaskForm";
import NavComponent from "../../components/NavComponent";

interface StoresPropsTypes {
  lng: string;
  projectid: string;
  data: Task[];
}

export default function ProjectData({
  lng,
  data,
  projectid,
}: StoresPropsTypes) {
  const { t } = useTranslation(lng, "projects");
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(addAllSTasks(data));
    initialized.current = true;
  }
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const projects = useAppSelector((state) => state.projects.projects);
  const project = projects.find((project) => project.id == projectid);
  const dispatch = useAppDispatch();

  const handleDelete = async (id: string) => {
    try {
      await axiosAuth.delete(`/task?id=${id}`);
      dispatch(removeTask(id));
      toast({
        variant: "default",
        description: t("task_deleted_successfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: t("task_delete_failed"),
      });
    }
  };
  const columnDefs = [
    { headerName: t("task_body"), field: "task_body" },
    { headerName: t("manager_name"), field: "manager_name" },
    { headerName: t("start_date"), field: "start_date" },
    { headerName: t("end_date"), field: "end_date" },
    {
      headerName: t("More"),
      field: "more",
      cellRenderer: ({ data }: any) => {
        return (
          <div className="flex gap-2">
            <DialogForm
              title={t("edit_Task")}
              Icon={Edit}
              type={"edit"}
              FormComponent={
                <AddTaskForm
                  lng={lng}
                  defaultValues={data}
                  taskId={data.id}
                  projectid={project?.id ?? ""}
                />
              }
            />
            <Button variant={"ghost"} onClick={() => handleDelete(data.id)}>
              <Trash className="text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="space-y-5 w-full px-3">
        <div className="flex gap-4">
          <DialogForm
            title={t("Add Task")}
            Icon={CirclePlus}
            FormComponent={<AddTaskForm projectid={projectid} lng={lng} />}
          />
          <NavComponent
            target="/dashboard/projects/orders"
            title={t("Orders")}
          />
          <Button variant={"secondary"}> {t("finish_the_project")}</Button>
        </div>
      </div>
      {project && (
        <div>
          <h2 className="font-bold text-xl mb-4">{project.project_name}</h2>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" /> <span>{project.location}</span>
          </div>
        </div>
      )}
      <AgGridTable columnDefs={columnDefs} rowData={tasks} />
    </>
  );
}
