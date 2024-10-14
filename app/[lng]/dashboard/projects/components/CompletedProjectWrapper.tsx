import React from "react";
import { fetchCompletedProjects } from "../actions/actions";
import CompletedProjectsData from "./CompletedProjectsData";

export default async function CompletedProjectWrapper({
  lng,
}: LanguageToggleProps) {
  const projects: Project[] = await fetchCompletedProjects();

  return <CompletedProjectsData lng={lng} data={projects} />;
}
