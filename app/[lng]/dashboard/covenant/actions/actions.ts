"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from "@/lib/axios";
import { error } from "console";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addCovenantSchema = z.object({
  covenant: z.string().min(1, {
    message: "convenant_amount_ar_min_length",
  }),
  note: z.string(),
});
const updateCovenantSchema = z.object({
  covenant: z.string().min(1, {
    message: "convenant_amount_ar_min_length",
  }),
});
export const getUsers = async (
  pageNumber: number
): Promise<ConvenantUser[]> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/covenant?page_size=10&page_number=${pageNumber}`;
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data.data.records ?? [];
  } catch (error) {
    console.error("Error fetching Convenant users data:", error);
    return [];
  }
};
export const getUserById = async (
  userId?: string
): Promise<CovenantDetails | any> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/covenant?page_size=10&page_number=1&staff_id=${userId}`;
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data ?? {};
  } catch (error) {
    console.error("Error fetching Convenant user data:", error);
    return null;
  }
};
export async function updateCovenant(covId: string, formData: any) {
  const validateFields = updateCovenantSchema.safeParse({
    covenant: formData.get("covenant"),
  });
  if (!validateFields.success) {
    `    console.log("errors", validateFields.error.flatten().fieldErrors);
`;
    return {
      covenant: validateFields.error.flatten().fieldErrors.covenant,
    };
  }

  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/covenant`;
  const values = new FormData();
  values.append("id", covId);
  values.append("new_covenant", formData.get("covenant"));

  try {
    const res = await fetch(endpoint, {
      method: "PUT",
      body: values,
      headers: {
        Authorization: `${session?.user.access_token}`,
      },
    });
    const data = await res.json();
    revalidatePath("/covenant");
    console.log("from action success", data, Object.fromEntries(values));
  } catch (err) {
    console.log("from action err", err);
  }
}
export async function addCovenant(userId: string, formData: any) {
  const validateFields = addCovenantSchema.safeParse({
    covenant: formData.get("covenant"),
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/covenant`;
  const values = new FormData();
  values.append("new_covenant", formData.get("covenant"));
  values.append("staff_id", userId);
  values.append("note", formData.get("note"));
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: values,
      headers: {
        Authorization: `${session?.user.access_token}`,
      },
    });
    const data = await res.json();
    revalidatePath("/covenant");
    console.log("from action success", data, Object.fromEntries(values));
  } catch (err) {
    console.log("from action err", err);
  }
}
