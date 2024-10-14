"use client";
import React, { Suspense, useRef, useState } from "react";
import { DialogForm } from "../../components/DialogForm";
import { CirclePlus, Edit, Trash } from "lucide-react";
import { CategoryForm } from "./CategoryForm";
import { useTranslation } from "@/app/i18n/client";
import Loading from "../../components/loading";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import AgGridTable from "../../components/AgGridTable";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import {
  addAllCategories,
  removeCategory,
} from "@/lib/features/categories/categoriesSlice";
import { Button } from "@/components/ui/button";
import DownloadButton from "../../components/DownloadButton";
interface CategoryPropsTypes {
  lng: string;
  data: Category[];
}
export default function CategoryData({ lng, data }: CategoryPropsTypes) {
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(addAllCategories(data));
    initialized.current = true;
  }
  const categories = useAppSelector((state) => state.categories.categories);
  const { t } = useTranslation(lng, "product");
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleDelete = async (id: string) => {
    try {
      await axiosAuth.delete(`/categories?id=${id}`);
      toast({
        variant: "default",
        description: t("category_deleted_successfully"),
      });
      dispatch(removeCategory(id));
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error_title"),
        description: t("category_delete_failed"),
      });
    }
  };
  const columnDefs = [
    { headerName: t("Category"), field: "category_name_en" },
    { headerName: t("Unit in Arabic"), field: "category_name_ar" },
    {
      headerName: t("More"),
      field: "more",
      cellRenderer: ({ data }: any) => (
        <div className="flex gap-2">
          <DialogForm
            title={t("edit_category")}
            Icon={Edit}
            type={"edit"}
            FormComponent={
              <CategoryForm
                lng={lng}
                defaultValues={data}
                categoryId={data.category_id}
              />
            }
          />
          <Button
            variant={"ghost"}
            onClick={() => handleDelete(data.category_id)}
          >
            <Trash className="text-red-500" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <DialogForm
          title={t("Add Category")}
          Icon={CirclePlus}
          FormComponent={<CategoryForm lng={lng} />}
        />
        <div className="flex gap-3">
          <DownloadButton
            endpoint="/categories"
            title={"categories"}
            lng={lng}
          />
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <AgGridTable columnDefs={columnDefs} rowData={categories} />
      </Suspense>
    </div>
  );
}
