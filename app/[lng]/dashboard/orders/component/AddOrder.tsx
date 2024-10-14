"use client";import { DialogForm } from "../../components/DialogForm";
import AddOrderForm from "./AddOrderForm";
import { CirclePlus } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import { useState } from "react";

export default function AddOrder({
  lng,
  products,
  projects,
  contractors,
  stores,
  invnetory,
}: any) {
  const { t } = useTranslation(lng, "order");
  const [closeAction, setCloseAction] = useState(false);
  return (
    <DialogForm
      title={t("Add order")}
      Icon={CirclePlus}
      FormComponent={
        <AddOrderForm
          products={products}
          projects={projects}
          contractors={contractors}
          stores={stores}
          setCloseAction={setCloseAction}
          inventory={invnetory}
        />
      }
      close={closeAction}
      setClose={setCloseAction}
    />
  );
}
