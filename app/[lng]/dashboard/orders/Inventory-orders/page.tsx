import { ColDef } from "ag-grid-community";import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { useTranslation } from "@/app/i18n";
import axios from "@/lib/axios";
import "../style.css";
import InvontryTable from "./components/InventoryTable";
import { fetchInventoryOrders, fetchOrders } from "../actions/actions";
import { DialogForm } from "../../components/DialogForm";
import AddOrderForm from "../component/AddOrderForm";
import { CirclePlus } from "lucide-react";
import { fetchProjects } from "../../projects/actions/actions";
import { fetchProducts } from "../../product/actions/actions";
import LoadingSpinner from "../../components/LoadingSpinner";
import AddOrder from "../component/AddOrder";

const columns: ColDef<any>[] = [
  {
    headerName: "Store Name",
    field: "storeName",
  },
  {
    headerName: "Location",
    field: "location",
  },
  {
    headerName: "Store Manager",
    field: "storeManager",
  },
  {
    headerName: "Phone Number",
    field: "phoneNumber",
  },
];

const data = [
  {
    storeName: "Elaqsa store",
    location: "Cairo",
    storeManager: "Mohamed saeed",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elashary Store",
    location: "Elbaher street",
    storeManager: "Ahmed Helmy",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  {
    storeName: "Elaqsa store",
    location: "Tanta",
    storeManager: "Ahmed nabil",
    phoneNumber: "01023456789",
  },
  // ... more data
];
export default async function Index({
  params: { lng },
  searchParams: { pageNumber },
}: {
  params: LanguageToggleProps;
  searchParams: { pageNumber: number };
}) {
  const session = await getServerSession(authOptions);
  const { t } = await useTranslation(lng, "store");
  const inventoryOrders = await fetchInventoryOrders(pageNumber);
  const fetchStores = async (pageNumber: number): Promise<Store[]> => {
    try {
      const res = await axios.get(
        `http://109.123.252.176:5000/api/store?page_size=10&page_number=${pageNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session?.user.access_token}`,
          },
        }
      );

      return res.data.data.records;
    } catch (error) {
      console.error("Error fetching stores:", error);
      return [];
    }
  };

  const stores = await fetchStores(1);
  const projects = await fetchProjects();
  const products = await fetchProducts();
  const pendingOrders = inventoryOrders?.filter(
    (order) =>
      order.state === "PENDING" &&
      order.ordered_products.filter(
        (pro: any) => pro.status !== "refused by admin"
      ).length >= 1
  );
  console.log({ pendingOrders });

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex justify-between items-center">
        <AddOrder
          projects={projects}
          products={products}
          lng={lng}
          stores={stores}
          invnetory={true}
        />
      </div>
      <h2 className="ms-5 font-bold">Inventory Orders</h2>
      {pendingOrders.map((order: InventoryOrder) => (
        <Suspense key={order.id} fallback={<LoadingSpinner />}>
          <InvontryTable
            inventoryOrder={order}
            products={products}
            stores={stores}
          />
        </Suspense>
      ))}
    </div>
  );
}
