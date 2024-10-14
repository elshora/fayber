import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";

export const fetchStores = async (): Promise<Store[]> => {
  const session = await getServerSession(authOptions);
  const endpoint = "http://109.123.252.176:5000/api/store";
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
export const fetchStore = async (
  id: string | number
): Promise<Store[]> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/store/stock?inventory_id=${id}`;
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
