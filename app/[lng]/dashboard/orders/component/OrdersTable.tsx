"use client";import React, { useEffect, useOptimistic, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "@/app/i18n/client";
import { verifyOrder } from "../actions/actions";
import { Button } from "@/components/ui/button";

interface OrdersTableProps {
  order: Order;
  lng: string;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ order, lng }) => {
  const { t } = useTranslation(lng, "orders");
  const [checkedOrders, setCheckedOrders] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // assuming you want 10 rows per page
  const [isLoading, setIsLoading] = useState(false);
  const handleCheck = (orderId: number) => {
    setCheckedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const columnDefs: ColDef<Order>[] = [
    {
      headerName: "Project Name",
      field: "project.project_name",
      // checkboxSelection: true,
      width: 160,
    },
    {
      headerName: "Product",
      field: "ordered_products.product_name",
      width: 160,
    },
    { headerName: "Amount", field: "ordered_products.quantity", width: 160 },
    { headerName: "Address", field: "project.location", width: 160 },
    { headerName: "Store", field: "inventory.inventory_name", width: 160 },
    {
      headerName: "Status",
      field: "status",
      width: 160,
      cellRenderer: (params: any) => (
        <StatusCellRenderer
          data={params.data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginatedOrders={paginatedOrders}
          handleDecline={handleDecline}
        />
      ),
    },
  ];

  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  let data: Order | any;
  if (order?.ordered_products.length > 0) {
    data = order?.ordered_products
      .filter((product: any) => product.status === "pending") // Filter products with status "pending"
      .map((product: any) => ({
        ...order,
        ordered_products: {
          product_code: product.product_info.code,
          product_name: product.product_info.product_name_en,
          quantity: product.quantity,
          state: product.status,
        },
        // stores: stores,
      }));
  }

  const paginatedOrders = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(data.length / pageSize);
  const [optimisticOrders, optimistVerify] = useOptimistic(
    paginatedOrders,
    (currentOrders, { productCode, id }) => {
      if (productCode !== null) {
        return currentOrders
          .map((order: any) => {
            if (
              order.id === id &&
              order.ordered_products.product_code === productCode
            ) {
              return null;
            }
            return order;
          })
          .filter((order: any) => order !== null);
      } else {
        return null;
      }
    }
  );

  async function handleDecline(id: string, productCode: string) {
    optimistVerify({ productCode, id });
    try {
      verifyOrder(false, id, "product", productCode);
      if (paginatedOrders.length === 1) {
        setCurrentPage(currentPage - 1);
      }
      toast({
        variant: "default",
        description: "Order declined successfully",
      });
    } catch (error: any) {
      console.log("An error occurred:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message ?? "Order hasn't been declined",
      });
    }
  }
  async function handleVerifyAll(id: string | number, type: string) {
    optimistVerify({ productCode: null, id });
    try {
      if (type === "reject") {
        verifyOrder(false, id.toString(), "reject");
        console.log("Order rejected successfully.");
        toast({
          variant: "default",
          description: "Order rejected",
        });
      } else {
        verifyOrder(false, id.toString(), "approve");
        console.log("Order accepted successfully.");
        toast({
          variant: "default",
          description: "Order accepted",
        });
      }
    } catch (error: any) {
      console.log("An error occurred:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message ??
          `Order hasn't been ${type === "reject" ? "rejected" : "accepted"}`,
      });
    }
  }

  if (optimisticOrders === null) return;
  return (
    <div className={"orders"}>
      <div style={{ height: "auto", width: "100%" }}>
        <div className="order-table ag-theme-alpine h-auto">
          <AgGridReact<Order>
            columnDefs={columnDefs}
            rowData={optimisticOrders}
            defaultColDef={defaultColDef}
            domLayout="autoHeight" // Add this line
            getRowStyle={(params: any) => {
              const rowIndex = params.node.rowIndex;
              return {
                marginTop: rowIndex === 0 ? "0" : `${10 * rowIndex}px`,
                backgroundColor: "#EBECEF",
                border: "none",
                borderRadius: "10px",
                display: "flex",
              };
            }}
          />
        </div>

        {data?.length > pageSize && (
          <div className={"pagination"}>
            <button
              className={`pageButton me-1 ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-2 px-2 pageButton ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => {
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`pageButton ms-1 ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-5 my-5">
        <Button
          disabled={isLoading}
          onClick={() => handleVerifyAll(order.id, "approve")}
        >
          Accept all
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => handleVerifyAll(order.id, "reject")}
        >
          Reject all
        </Button>
      </div>
    </div>
  );
};

const StatusCellRenderer = (params: any) => {
  const [loading, setIsLoading] = useState(false);
  return (
    <div className="flex align-middle justify-start gap-x-4">
      <button
        disabled={loading}
        className="bg-none border-none"
        onClick={() => {
          {
            params.handleDecline(
              params.data.id,
              params.data.ordered_products.product_code
            );
          }
        }}
      >
        <span className="text-red-500 border border-red-500 rounded-full px-2 py-1 hover:bg-red-500 hover:text-white">
          ✖
        </span>
      </button>
    </div>
  );
};

export default OrdersTable;
