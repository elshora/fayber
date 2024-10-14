import { Suspense } from "react";
import AgGridTable from "../../components/AgGridTable";
import LoadingCards from "../../components/LoadingCards";
import { ColDef } from "ag-grid-community";

export default function ExpensesTable() {
  // const data = [
  //   {
  //     product: "Product 1",
  //     amount: 10,
  //     total_price: 100,
  //     date: "2023-07-26",
  //     note: "First order",
  //   },
  //   {
  //     product: "Product 2",
  //     amount: 5,
  //     total_price: 50,
  //     date: "2023-07-27",
  //     note: "Second order",
  //   },
  //   {
  //     product: "Product 3",
  //     amount: 20,
  //     total_price: 200,
  //     date: "2023-07-28",
  //     note: "Third order",
  //   },
  //   {
  //     product: "Product 4",
  //     amount: 15,
  //     total_price: 150,
  //     date: "2023-07-29",
  //     note: "Fourth order",
  //   },
  //   {
  //     product: "Product 5",
  //     amount: 8,
  //     total_price: 80,
  //     date: "2023-07-30",
  //     note: "Fifth order",
  //   },
  //   {
  //     product: "Product 5",
  //     amount: 8,
  //     total_price: 80,
  //     date: "2023-07-30",
  //     note: "Fifth order",
  //   },
  //   {
  //     product: "Product 5",
  //     amount: 8,
  //     total_price: 80,
  //     date: "2023-07-30",
  //     note: "Fifth order",
  //   },
  //   {
  //     product: "Product 5",
  //     amount: 8,
  //     total_price: 80,
  //     date: "2023-07-30",
  //     note: "Fifth order",
  //   },
  //   {
  //     product: "Product 5",
  //     amount: 8,
  //     total_price: 80,
  //     date: "2023-07-30",
  //     note: "Fifth order",
  //   },
  //   {
  //     product: "Product 5",
  //     amount: 8,
  //     total_price: 80,
  //     date: "2023-07-30",
  //     note: "Fifth order",
  //   },
  //   {
  //     product: "Product 5",
  //     amount: 8,
  //     total_price: 80,
  //     date: "2023-07-30",
  //     note: "Fifth order",
  //   },
  //   {
  //     product: "Product 5",
  //     amount: 8,
  //     total_price: 80,
  //     date: "2023-07-30",
  //     note: "Fifth order",
  //   },
  // ];
  const data: any = [];
  const columnDefs: ColDef<TransactionDetails>[] = [
    { headerName: "Product", field: "transaction" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Date", field: "transaction_date" },
    { headerName: "Note", field: "note" },
  ];

  return (
    <div>
      <Suspense fallback={<LoadingCards />}>
        <AgGridTable columnDefs={columnDefs} rowData={data} />
      </Suspense>
    </div>
  );
}
