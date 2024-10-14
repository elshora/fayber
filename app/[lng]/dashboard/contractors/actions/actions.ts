"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from "@/lib/axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getContractors = async (
  pageNumber: number
): Promise<Contractors[]> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/contractor?page_size=10&page_number=${pageNumber}`;
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });

    return res.data.data.records ?? [];
  } catch (error) {
    console.error("Error fetching Contractors data:", error);
    return [];
  }
};
export const getContractorById = async (
  id: string
): Promise<Contractors | null> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/contractor?id=${id}&page_size=10&page_number=1`;
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });

    revalidatePath("/contractors");
    return res.data ?? {};
  } catch (error) {
    console.error("Error fetching Contractors data:", error);
    return null;
  }
};
export async function deleteContractor(id: string) {
  const session = await getServerSession(authOptions);
  try {
    const res = await fetch(
      `http://109.123.252.176:5000/api/contractor?id=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${session?.user.access_token}`,
        },
      }
    );
    const data = await res.json();
    revalidatePath("/contractors");
    return data;
  } catch (error: any) {
    console.error("Error deleting contractor:", error);
  }
}
