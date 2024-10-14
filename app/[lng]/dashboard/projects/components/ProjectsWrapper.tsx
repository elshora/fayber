import AgGridTable from "../../components/AgGridTable";
import { fetchProjects } from "../actions/actions";
import ProjectsData from "./ProjectsData";

export default async function ProjectsWrapper({ lng }: LanguageToggleProps) {
  const projects: Project[] = await fetchProjects();
  return <ProjectsData lng={lng} data={projects} />;
}
