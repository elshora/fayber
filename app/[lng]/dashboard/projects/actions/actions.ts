import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";import axios from "axios";
import { getServerSession } from "next-auth";
export const fetchProjects = async (): Promise<Project[]> => {
  const session = await getServerSession(authOptions);
  const endpoint =
    "http://109.123.252.176:5000/api/projects?state=all&page_size=10&page_number=1";
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data.data.records ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchCompletedProjects = async (): Promise<Project[]> => {
  const session = await getServerSession(authOptions);
  const endpoint = "http://109.123.252.176:5000/api/projects?state=completed";
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchProject = async (
  id: string | number
): Promise<Project | null> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/projects?id=${id}`;
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const fetchProjectsTasks = async (
  id: string | number
): Promise<Task[]> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/task?project_id=${id}`;
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
