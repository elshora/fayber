import React from "react";
interface CheckboxListProps {
  stores: any[];
  selectedStoreId: number | null;
  handleCheckboxChange: (storeId: number) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  stores,
  selectedStoreId,
  handleCheckboxChange,
}) => {
  return (
    <div>
      {stores.map((store) => (
        <div key={store.id} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            id={`checkbox-${store.id}`}
            checked={selectedStoreId === store.id}
            onChange={() => handleCheckboxChange(store.id)}
          />
          <label htmlFor={`checkbox-${store.id}`} style={{ marginLeft: "8px" }}>
            {store.inventory_name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
