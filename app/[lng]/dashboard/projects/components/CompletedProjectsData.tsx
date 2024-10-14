"use client";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "@/app/i18n/client";
import AgGridTable from "../../components/AgGridTable";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { addCompletedProjects } from "@/lib/features/projects/projectsSlice";

interface ProjectsPropsTypes {
  lng: string;
  data: Project[];
}
export default function CompletedProjectsData({
  lng,
  data,
}: ProjectsPropsTypes) {
  const { t } = useTranslation(lng, "store");
  const store = useAppStore();
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(addCompletedProjects(data));
      initialized.current = true;
    }
  }, []);
  const completedProjects = useAppSelector(
    (state) => state.projects.completedProjects
  );

  const columnDefsProjects = [
    { headerName: "Project Name", field: "project_name" },
    { headerName: "Project Manager", field: "manager_name" },
    { headerName: "Location", field: "location" },
    { headerName: "Store Name", field: "inventory_name" },
    { headerName: "Start Date", field: "start_date", type: "date" },
    { headerName: "end Date", field: "end_date", type: "date" },
    { headerName: "state:", field: "state" },
    { headerName: "More", field: "more", cellRenderer: "agGroupCellRenderer" },
  ];

  return (
    <AgGridTable columnDefs={columnDefsProjects} rowData={completedProjects} />
  );
}
