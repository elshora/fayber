import React, { Suspense, useOptimistic } from "react";import { useTranslation } from "@/app/i18n";
import { DialogForm } from "../components/DialogForm";
import { CirclePlus } from "lucide-react";
import NavComponent from "../components/NavComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import axios from "@/lib/axios";
import OrdersTable from "./component/OrdersTable";
import "./style.css";
import Loading from "../components/loading";
import { fetchOrders } from "./actions/actions";
import AddOrderForm from "./component/AddOrderForm";
import { fetchProjects } from "../projects/actions/actions";
import { getContractors } from "../contractors/actions/actions";
import { fetchProducts } from "../product/actions/actions";
import AddOrder from "./component/AddOrder";

export default async function Index({
  params,
  searchParams: { pageNumber },
}: {
  params: { lng: string };
  searchParams: { pageNumber: number };
}) {
  const { lng } = params;
  const { t } = await useTranslation(lng, "return");
  const session = await getServerSession(authOptions);

  const projects = await fetchProjects();
  const orders = await fetchOrders("order", pageNumber || 1);
  const products = await fetchProducts();
  const pendingOrders = orders?.filter((order) => order.state === "PENDING");
  const contractors = await getContractors(1);
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex justify-between items-center">
        <AddOrder
          projects={projects}
          products={products}
          contractors={contractors}
          lng={lng}
        />
        <div className="flex gap-3">
          <NavComponent
            title={t("Inventory orders")}
            target={`/${lng}/dashboard/orders/Inventory-orders?pageNumber=1`}
          />
        </div>
      </div>
      <div>
        <h2 className="ms-5 font-bold">Orders</h2>
        {pendingOrders.map((order: Order) => (
          <Suspense key={order.id} fallback={<Loading />}>
            <OrdersTable order={order} lng={lng} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
