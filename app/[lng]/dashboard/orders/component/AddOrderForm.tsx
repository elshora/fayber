"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { addInventoryOrder, addOrder } from "../actions/actions";
import { useFormStatus } from "react-dom";
import { toast } from "@/components/ui/use-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Params {
  projects: Project[];
  contractors?: Contractors[];
  inventory?: boolean;
  products?: ProductDetails[];
  stores?: Store[];
  setCloseAction?: any;
  setCloseText?: any;
}

const AddOrderForm = ({
  projects = [],
  contractors = [],
  inventory = false,
  products = [],
  stores = [],
  setCloseAction = null,
}: Params) => {
  const [formValues, setFormValues] = useState({
    project_id: "",
    type: "order",
    contractor: "",
    order_note: "",
    product_quantity_dict: [{ product_code: "", amount: "" }],
    to_inventory_id: "",
  });

  const inventories = stores.map((store) => ({
    label: store.inventory_name,
    value: store.id,
  }));

  const productsOptions = products.map((product) => ({
    label: product.category_name_en,
    value: product.product_code,
  }));

  const handleAddProduct = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      product_quantity_dict: [
        ...prevValues.product_quantity_dict,
        { product_code: "", amount: "" },
      ],
    }));
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = formValues.product_quantity_dict.filter(
      (_, i) => i !== index
    );
    setFormValues({ ...formValues, product_quantity_dict: updatedProducts });
  };

  if (products.length <= 0 || projects.length <= 0)
    return (
      <div className="w-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  async function formAction(formData: FormData) {
    if (inventory)
      try {
        await addInventoryOrder(formData);
        toast({
          variant: "default",
          description: "Order added successfully",
          className: "w-[100%]",
        });
        setCloseAction(false);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message ?? "Order hasn't been declined",
          className: "w-[100%]",
        });
      }
    else {
      try {
        await addOrder(formData);
        toast({
          variant: "default",
          description: "Order added successfully",
          className: "w-[100%]",
        });
        setCloseAction(false);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message ?? "Order hasn't been declined",
          className: "w-[100%]",
        });
      }
    }
  }
  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-5 mb-5">
        {inventory ? (
          <div className="space-y-2">
            <label
              htmlFor="to_inventory_id"
              className="block text-sm font-medium text-gray-700"
            >
              Inventory Name
            </label>
            <select
              name="to_inventory_id"
              id="to_inventory_id"
              className="block cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            >
              <option className="py-2 cursor-pointer" value="" disabled>
                Select an Inventory
              </option>
              {inventories.map((inventory) => (
                <option
                  className="py-2 cursor-pointer"
                  key={inventory.value}
                  value={inventory.value}
                >
                  {inventory.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="project_id"
                className="block text-sm font-medium text-gray-700"
              >
                Project
              </label>
              <select
                name="project_id"
                id="project_id"
                // value={formValues.project_id}
                // onChange={handleInputChange}
                className="block cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              >
                <option className="py-2 cursor-pointer" value="" disabled>
                  Select a project
                </option>
                {projects.map((project) => (
                  <option
                    className="py-2 cursor-pointer"
                    key={project.id}
                    value={project.id}
                  >
                    {project.project_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                name="type"
                id="type"
                // value={formValues.type}
                // onChange={handleInputChange}
                className="block w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              >
                <option className="py-2 cursor-pointer" value="order">
                  Order
                </option>
                <option className="py-2 cursor-pointer" value="return">
                  Return
                </option>
                <option className="py-2 cursor-pointer" value="cancelled">
                  Cancelled
                </option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contractor"
                className="block text-sm font-medium text-gray-700"
              >
                Contractor
              </label>
              <select
                name="contractor"
                id="contractor"
                // value={formValues.contractor}
                // onChange={handleInputChange}
                className="block w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              >
                <option className="py-2 cursor-pointer" value="" disabled>
                  Select a contractor
                </option>
                {contractors.map((contractor) => (
                  <option
                    className="py-2 cursor-pointer"
                    key={contractor.name}
                    value={contractor.name}
                  >
                    {contractor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {formValues.product_quantity_dict.map((product, index) => (
            <div key={index} className="flex items-end space-x-2">
              <div className="space-y-2 flex-1">
                <label
                  htmlFor={`product_code_${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Product
                </label>
                <select
                  name={`product_quantity_dict.${index}.product_code`}
                  id={`product_code_${index}`}
                  // value={product.product_code}
                  // onChange={(e) => handleInputChange(e, index)}
                  className="block w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                >
                  <option
                    className="py-2 cursor-pointer"
                    value=""
                    selected
                    disabled
                  >
                    Select a product
                  </option>
                  {productsOptions.map((productOption) => (
                    <option
                      className="py-2 cursor-pointer"
                      key={productOption.value}
                      value={productOption.value}
                    >
                      {productOption.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 flex-1">
                <label
                  htmlFor={`amount_${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id={`amount_${index}`}
                  name={`product_quantity_dict.${index}.amount`}
                  min={1}
                  defaultValue={1}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="bg-red-500 text-white rounded-md px-3 py-2"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddProduct}
            className="text-sm bg-primary text-white rounded-md px-4 py-2"
          >
            Add Product
          </Button>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="order_note"
            className="block text-sm font-medium text-gray-700"
          >
            Order Note
          </label>
          <textarea
            id="order_note"
            name="order_note"
            // value={formValues.order_note}
            // onChange={handleInputChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
      <DialogFooter>
        <SubmitButton />
      </DialogFooter>
    </form>
  );
};

export default AddOrderForm;
function SubmitButton({ t }: { t?: any }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Loading..." : "Add Order"}
    </Button>
  );
}
