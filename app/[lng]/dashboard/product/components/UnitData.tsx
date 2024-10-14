"use client";
import React, { Suspense, useRef } from "react";
import { DialogForm } from "../../components/DialogForm";
import { CirclePlus, Edit, Trash } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import Loading from "../../components/loading";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import AgGridTable from "../../components/AgGridTable";
import { UnitForm } from "./UnitForm";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { addAllUnits, removeUnit } from "@/lib/features/units/unitsSlice";
import DownloadButton from "../../components/DownloadButton";
interface CategoryPropsTypes {
  lng: string;
  data: Unit[];
}
export default function UnitData({ lng, data }: CategoryPropsTypes) {
  const { t } = useTranslation(lng, "product");
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(addAllUnits(data));
    initialized.current = true;
  }
  const units = useAppSelector((state) => state.units.units);
  const dispatch = useAppDispatch();
  console.log(units);
  const handleDelete = async (id: string) => {
    try {
      await axiosAuth.delete(`/units?id=${id}`);
      dispatch(removeUnit(id));
      toast({
        variant: "default",
        description: t("unit_deleted_successfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: t("unit_delete_failed"),
      });
    }
  };
  const columnDefs = [
    { headerName: t("Unit Name EN"), field: "unit_name_en" },
    { headerName: t("Unit Name AR"), field: "unit_name_ar" },
    {
      headerName: t("More"),
      field: "more",
      cellRenderer: ({ data }: any) => (
        <div className="flex gap-2">
          <DialogForm
            title={t("edit_unit")}
            Icon={Edit}
            type={"edit"}
            FormComponent={
              <UnitForm lng={lng} defaultValues={data} unitId={data.unit_id} />
            }
          />
          <button onClick={() => handleDelete(data.unit_id)}>
            <Trash className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <DialogForm
          title={t("add_unit")}
          Icon={CirclePlus}
          FormComponent={<UnitForm lng={lng} />}
        />
        <div className="flex gap-3">
          <DownloadButton endpoint="/units" title={"units"} lng={lng} />
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <AgGridTable columnDefs={columnDefs} rowData={units} />
      </Suspense>
    </div>
  );
}
