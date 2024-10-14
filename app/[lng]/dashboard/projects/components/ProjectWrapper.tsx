import React from "react";
import { fetchProjectsTasks } from "../actions/actions";
import ProjectData from "./ProjectData";
interface StoreWrapperProps {
  lng: string;
  projectid: string;
}
export default async function ProjectWrapper({
  lng,
  projectid,
}: StoreWrapperProps) {
  const tasks = await fetchProjectsTasks(projectid);
  return <ProjectData lng={lng} data={tasks} projectid={projectid} />;
}
