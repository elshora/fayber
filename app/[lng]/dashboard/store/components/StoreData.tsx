"use client";
import React, { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import AgGridTable from "../../components/AgGridTable";

interface StoresPropsTypes {
  lng: string;
  data: Store[];
}

export default function StoreData({ lng, data }: StoresPropsTypes) {
  const { t } = useTranslation(lng, "store");
  const [columnDefs] = useState([
    {
      headerName: "product_name_ar",
      field: "product_details.product_name_ar",
    },
    {
      headerName: "product_name_ar",
      field: "product_details.product_name_en",
    },
    { headerName: "Product Number", field: "product_details.code" },
    { headerName: "Actual Amount", field: "stored_quantity" },
    { headerName: "Available Amount", field: "available_quantity" },
    { headerName: "Minimum Amount", field: "minimum_amount" },
  ]);

  return (
    <>
      <AgGridTable columnDefs={columnDefs} rowData={data} />
    </>
  );
}
