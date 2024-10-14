"use client";
import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import AgGridTable from "../../components/AgGridTable";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { addAllSStores } from "@/lib/features/stores/storesSlice";
import Link from "next/link";
import { ColDef } from "ag-grid-community";
import { DialogForm } from "../../components/DialogForm";
import { CirclePlus } from "lucide-react";
import { InventoryForm } from "./InventoryForm";
import DownloadButton from "../../components/DownloadButton";

interface StoresPropsTypes {
  lng: string;
  data: Store[];
}

export default function StoresData({ lng, data }: StoresPropsTypes) {
  const { t } = useTranslation(lng, "store");
  const [storeColumn, setStoreColumn] = useState<ColDef[]>([]);
  const store = useAppStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(addAllSStores(data));
      initialized.current = true;
    }
    const columnDefs = [
      {
        headerName: "Store Name",
        field: "inventory_name",
      },
      {
        headerName: "Location",
        field: "location",
      },
      {
        headerName: "Store Manager",
        field: "store_manager",
      },
      {
        headerName: "Phone Number",
        field: "phone_number",
      },
      {
        headerName: t("More"),
        field: "more",
        cellRenderer: ({ data }: any) => (
          <Link href={`store/${data.id}`} className="text-xl w-full">
            ...
          </Link>
        ),
      },
    ];
    setStoreColumn(columnDefs);
  }, []);
  const stores = useAppSelector((state) => state.stores.stores);

  return (
    <>
      <div className="flex justify-between items-center">
        <DialogForm
          title={t("Add Store")}
          Icon={CirclePlus}
          FormComponent={<InventoryForm lng={lng} />}
        />
        <div className="flex gap-3">
          <DownloadButton endpoint="/store" title={"store"} lng={lng} />
        </div>
      </div>
      <AgGridTable columnDefs={storeColumn} rowData={stores} />
    </>
  );
}
