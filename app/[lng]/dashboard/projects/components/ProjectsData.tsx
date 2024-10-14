"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import AgGridTable from "../../components/AgGridTable";
import { addAllProjects } from "@/lib/features/projects/projectsSlice";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { ColDef } from "ag-grid-community";
import Link from "next/link";
import { DialogForm } from "../../components/DialogForm";
import { CirclePlus } from "lucide-react";
import { AddProjectForm } from "./AddProjectForm";
import DownloadButton from "../../components/DownloadButton";
import NavComponent from "../../components/NavComponent";

interface ProjectsPropsTypes {
  lng: string;
  data: Project[];
}
export default function ProjectsData({ lng, data }: ProjectsPropsTypes) {
  const { t } = useTranslation(lng, "projects");
  const store = useAppStore();
  const [projectColumn, setProjectColumn] = useState<ColDef[]>([]);

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(addAllProjects(data));
      initialized.current = true;
      setProjectColumn([
        { headerName: "Project Name", field: "project_name" },
        { headerName: "Project Manager", field: "manager_name" },
        { headerName: "Location", field: "location" },
        { headerName: "Store Name", field: "inventory_name" },
        { headerName: "Start Date", field: "start_date", type: "date" },
        { headerName: "end Date", field: "end_date", type: "date" },
        { headerName: "state:", field: "state" },
        {
          headerName: t("More"),
          field: "more",
          cellRenderer: ({ data }: any) => (
            <Link href={`projects/${data.id}`} className="text-xl w-full">
              ...
            </Link>
          ),
        },
      ]);
    }
  }, []);

  const projects = useAppSelector((state) => state.projects.projects);

  return (
    <>
      <div className="flex justify-between items-center">
        <DialogForm
          title={t("Add Project")}
          Icon={CirclePlus}
          FormComponent={<AddProjectForm lng={lng} />}
        />
        <div className="flex gap-3">
          <DownloadButton
            endpoint="/projects?state=all"
            title={"projects"}
            lng={lng}
          />
          <NavComponent
            title={t("Completed Projects")}
            target={`/${lng}/dashboard/projects/completed-projects`}
          />
        </div>
      </div>
      <AgGridTable columnDefs={projectColumn} rowData={projects} />
    </>
  );
}
