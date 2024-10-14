"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function addOrder(formValues: any) {
  const products: any = {};

  // Iterate over the FormData entries
  formValues.forEach((value: any, key: any) => {
    // Check if the key starts with "product_quantity_dict."
    if (key.startsWith("product_quantity_dict.")) {
      // Extract the index and field name from the key
      const [_, index, field] = key.split(".");
      // If this index is not yet in the products object, create it
      if (!products[index]) {
        products[index] = {};
      }
      // Assign the value to the corresponding field (product_code or amount)
      products[index][field] = value;
    }
  });

  // Convert the products object into an array of product objects
  const productArray = Object.values(products);

  // formating products names and amounts in key - value pares
  const productsObj = productArray.reduce((acc: any, pro: any) => {
    acc[pro.product_code] = pro.amount;
    return acc;
  }, {});
  // formatting payload
  const payload = {
    params_dict: {
      project_id: formValues.get("project_id"),
      type: formValues.get("type"),
      contractor: formValues.get("contractor"),
      order_note: formValues.get("order_note"),
      product_quantity_dict: productsObj,
    },
  };

  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/user_orders`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `${session?.user.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    revalidatePath("/orders");
    return data;
  } catch (error) {
    console.error("Error fetching Inventory orders:", error);
    return [];
  }
}
export async function addInventoryOrder(formValues: any) {
  const products: any = {};

  // Iterate over the FormData entries
  formValues.forEach((value: any, key: any) => {
    // Check if the key starts with "product_quantity_dict."
    if (key.startsWith("product_quantity_dict.")) {
      // Extract the index and field name from the key
      const [_, index, field] = key.split(".");
      // If this index is not yet in the products object, create it
      if (!products[index]) {
        products[index] = {};
      }
      // Assign the value to the corresponding field (product_code or amount)
      products[index][field] = value;
    }
  });

  // Convert the products object into an array of product objects
  const productArray = Object.values(products);

  // formating products names and amounts in key - value pares
  const productsObj = productArray.reduce((acc: any, pro: any) => {
    acc[pro.product_code] = pro.amount;
    return acc;
  }, {});
  // formatting payload
  const payload = {
    params_dict: {
      to_inventory_id: formValues.get("to_inventory_id"),
      order_note: formValues.get("order_note"),
      product_quantity_dict: productsObj,
    },
  };

  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/inventory_orders`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `${session?.user.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(payload, Object.fromEntries(formValues));
    revalidatePath("/orders/Inventory-orders");
    return data;
  } catch (error) {
    console.error("Error fetching Inventory orders:", error);
    return [];
  }
}
export const fetchOrders = async (
  type: string,
  pageNumber: number
): Promise<Order[]> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/user_orders?page_size=1000&page_number=${pageNumber}&project_id=7&type=${type}`;
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
export const fetchInventoryOrders = async (
  pageNumber: number
): Promise<InventoryOrder[]> => {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/inventory_orders?page_size=1000&page_number=${pageNumber}&orders_to_show=orders`;
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data.data.records ?? [];
  } catch (error) {
    console.error("Error fetching Inventory orders:", error);
    return [];
  }
};
export const verifyOrder = async (
  inventory: boolean,
  id: string,
  type: string,
  product_code: string = "",
  store_id?: string
) => {
  const formData = new FormData();

  if (type === "product") {
    formData.append("type", inventory ? "inventory" : "project");
    formData.append("refused_by", "admin");
    formData.append("order_id", id);
    formData.append("product_code", product_code);
  } else {
    formData.append("id", id);
    if (store_id) formData.append("store_id", store_id);
    formData.append("state", `${type === "approve" ? "1" : "0"}`);
    formData.append("source", "admin");
    formData.append("count", "1");
  }

  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/${
    type === "product"
      ? "products/refuse"
      : store_id
      ? "inventory_orders"
      : "user_orders"
  }`;

  try {
    const res = await fetch(endpoint, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `${session?.user.access_token}`,
      },
    });

    // Check if the response was successful
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Error verifying");
    }

    const data = await res.json();

    revalidatePath("/orders");
    return data;
  } catch (error: any) {
    console.log("formData", Object.fromEntries(formData));
    console.error("Error verifying:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};
export async function getPruductsName(productCode: string) {
  const session = await getServerSession(authOptions);
  const endpoint = `http://109.123.252.176:5000/api/products?code=${productCode}`;
  try {
    const res = await axios.get(endpoint, {
      headers: {
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data ?? [];
  } catch (error) {
    console.error("Error verifying:", error);
    return [];
  }
}
