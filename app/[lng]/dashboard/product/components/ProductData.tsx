"use client";
import React from "react";
import { DialogForm } from "../../components/DialogForm";
import { Edit, Trash } from "lucide-react";
import { CategoryForm } from "./CategoryForm";
import { useTranslation } from "@/app/i18n/client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import AgGridTable from "../../components/AgGridTable";
import DownloadButton from "../../components/DownloadButton";
import NavComponent from "../../components/NavComponent";
interface ProductPropsTypes {
  lng: string;
  data: Product[];
}
export default function ProductData({ lng, data }: ProductPropsTypes) {
  const { t } = useTranslation(lng, "product");
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await axiosAuth.delete(`/categories/${id}`);
      toast({
        variant: "default",
        description: t("category_deleted_successfully"),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: t("category_delete_failed"),
      });
    }
  };
  const columnDefs = [
    { headerName: t("Product name"), field: "product_name_en" },
    { headerName: t("Name in Arabic"), field: "category_name_ar" },
    { headerName: t("Product code"), field: "product_code" },
    { headerName: t("Unit"), field: "unit_name_en" },
    { headerName: t("Unit in Arabic"), field: "unit_name_ar" },
    { headerName: t("Category"), field: "category_name_en" },
    { headerName: t("Category"), field: "category_name_ar" },
    {
      headerName: t("More"),
      field: "more",
      cellRenderer: ({ data }: any) => (
        <div className="flex gap-2">
          <DialogForm
            title={t("")}
            Icon={Edit}
            FormComponent={
              <CategoryForm
                lng={lng}
                defaultValues={data}
                categoryId={data.id}
              />
            }
          />
          <button onClick={() => handleDelete(data.id)}>
            <Trash className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center">
        <h3>{t("Products")}</h3>
        <div className="flex gap-3">
          <DownloadButton endpoint="/products" title="products" lng={lng} />
          <NavComponent
            title={t("Unit")}
            target={`/${lng}/dashboard/product/unit`}
          />
          <NavComponent
            title={t("Category")}
            target={`/${lng}/dashboard/product/category`}
          />
        </div>
      </div>
      <AgGridTable columnDefs={columnDefs} rowData={data} />
    </>
  );
}
