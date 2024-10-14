"use client";import React, { useOptimistic, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AccordionField } from "../../../components/Accordion";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup } from "@/components/ui/radio-group";
import { verifyOrder } from "../../actions/actions";
import { Button } from "@/components/ui/button";

interface InvontryProps {
  inventoryOrder: InventoryOrder;
  products: ProductDetails[];
  stores: Store[];
}

const InvontryTable: React.FC<InvontryProps> = ({
  inventoryOrder,
  products,
  stores,
}) => {
  const [checkedOrders, setCheckedOrders] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const storeIdRef = useRef<string | null>(null);

  // const handleValueChange = useCallback(
  //   (e: any) => {
  //     setSelectedStoreId((pre) => e);
  //   },
  //   [setSelectedStoreId]
  // );
  const handleCheck = (orderId: number) => {
    setCheckedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const columnDefs: ColDef<InventoryOrder>[] = [
    {
      headerName: "To inventory",
      field: "to_inventory.inventory_name",
      // checkboxSelection: true,
      width: 160,
    },
    {
      headerName: "Product",
      field: `ordered_products.product_name`,
      width: 160,
    },
    { headerName: "Amount", field: `ordered_products.quantity`, width: 160 },
    { headerName: "Address", field: "to_inventory.location", width: 160 },
    {
      headerName: "Stores",
      field: "stores",
      width: 160,
      autoHeight: true,
      cellRenderer: (params: any) => {
        return (
          <AccordionField
            items={[
              {
                trigger: "Inventory",
                item: (
                  <RadioGroup value="group">
                    {params?.value?.map((store: Store, index: number) => {
                      return (
                        <div
                          key={store.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name={`store${params.data.ordered_products.product_code}`}
                            value={`${store.id}`}
                            onChange={(e) => {
                              storeIdRef.current = e.target.value;
                            }}
                            className="cursor-pointer w-5 h-5"
                          />
                          <label htmlFor={`${store.id}`}>
                            {store.inventory_name}
                          </label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                ),
              },
            ]}
          />
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      width: 160,
      cellRenderer: (params: any) => (
        <StatusCellRenderer
          data={params.data}
          storeId={storeIdRef}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginatedOrders={paginatedOrders}
          handleApprove={handleApprove}
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
  if (inventoryOrder?.ordered_products.length > 0) {
    data = inventoryOrder?.ordered_products
      .filter((product: any) => product.status === "pending") // Filter products with status "pending"
      .map((product: any) => ({
        ...inventoryOrder,
        ordered_products: {
          product_code: product.product_info.code,
          product_name: product.product_info.product_name_en,
          quantity: product.quantity,
          state: product.status,
        },
        stores: stores,
      }));
  }
  // const data: InventoryOrder[] | any = pendingOrders?.flatMap((order) => {
  //   if (order.ordered_products.length > 0) {
  //     return order.ordered_products
  //       .filter(
  //         (product: any) =>
  //           product.status === "pending" ||
  //           product.status === "accepted by admin"
  //       ) // Filter products with status "pending"
  //       .map((product: any) => ({
  //         ...order,
  //         ordered_products: {
  //           product_code: product.product_info.code,
  //           product_name: product.product_info.product_name_en,
  //           quantity: product.quantity,
  //         },
  //         stores: stores,
  //       }));
  //   } else {
  //     return [order];
  //   }
  // });
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedOrders = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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

  async function handleApprove(
    id: string,
    storeId: string,
    productCode: string
  ) {
    optimistVerify({ productCode, id });
    await verifyOrder(true, id, "approve", "", storeId)
      .then(() => {
        console.log("Order approved successfully.");
        toast({
          variant: "default",
          description: "Order accepted",
        });
      })
      .catch((error: any) => {
        console.log("An error occurred:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message ?? "Order hasn't been accepted",
        });
      });
  }
  async function handleDecline(id: string, productCode: string) {
    optimistVerify({ productCode, id });
    verifyOrder(true, id, "product", productCode)
      .then(() => {
        if (paginatedOrders.length === 1) {
          setCurrentPage(currentPage - 1);
        }
        toast({
          variant: "default",
          description: "Order declined successfully",
        });
      })
      .catch((error: any) => {
        console.log("An error occurred:", error);

        toast({
          variant: "destructive",
          title: "Error",
          description: error.message ?? "Order hasn't been declined",
        });
      });
  }
  async function handleVerifyAll(
    id: string | number,
    type: string,
    storeId?: string
  ) {
    console.log({ storeId });

    optimistVerify({ productCode: null, id });
    try {
      if (type === "reject") {
        verifyOrder(true, id.toString(), "reject");
        console.log("Order rejected successfully.");
        toast({
          variant: "default",
          description: "Order rejected",
        });
      } else {
        verifyOrder(true, id.toString(), "approve", "", storeId);
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
          <AgGridReact<InventoryOrder>
            columnDefs={columnDefs}
            rowData={optimisticOrders}
            domLayout="autoHeight" // Add this line
            defaultColDef={defaultColDef}
            // rowSelection="multiple"
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
            // onSelectionChanged={(params) => {
            //   const selectedRows = params.api.getSelectedRows();
            //   setCheckedOrders(
            //     selectedRows.map((row: InventoryOrder) => row.id)
            //   );
            // }}
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
        <div className="flex items-center gap-x-5 my-5">
          <Button
            onClick={() => {
              if (!storeIdRef.current)
                toast({
                  variant: "destructive",
                  title: "invalid",
                  description: "you must choose a store",
                });
              else
                handleVerifyAll(
                  inventoryOrder.id,
                  "approve",
                  storeIdRef.current
                );
            }}
          >
            Accept all
          </Button>
          <Button onClick={() => handleVerifyAll(inventoryOrder.id, "reject")}>
            Reject all
          </Button>
        </div>
      </div>
    </div>
  );
};

const StatusCellRenderer = (params: any) => {
  function handleDeclineClick() {
    params.handleDecline(
      params.data.id,
      params.data.ordered_products.product_code
    );
  }
  return (
    <div className="flex align-middle justify-start gap-x-4">
      <button
        className="bg-none border-none"
        onClick={() => handleDeclineClick()}
      >
        <span className="text-red-500 border border-red-500 rounded-full px-2 py-1 hover:bg-red-500 hover:text-white">
          ✖
        </span>
      </button>
    </div>
  );
};

export default InvontryTable;
