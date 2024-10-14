import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";

export const fetchCategories = async (): Promise<Category[]> => {
  const endPoint = "http://109.123.252.176:5000/api/categories";
  const session = await getServerSession(authOptions);
  try {
    const res = await axios.get(endPoint, {
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
export const fetchProducts = async (): Promise<ProductDetails[]> => {
  const endPoint = "http://109.123.252.176:5000/api/products";
  const session = await getServerSession(authOptions);
  try {
    const res = await axios.get(endPoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data.data.records ?? [];
  } catch (error) {
    console.error("Error fetching products data:", error);
    return [];
  }
};

export const fetchUnits = async (): Promise<Unit[]> => {
  const endpoint = "http://109.123.252.176:5000/api/units";
  const session = await getServerSession(authOptions);
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
