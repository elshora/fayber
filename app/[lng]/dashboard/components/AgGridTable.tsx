"use client";
import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface AgGridTableProps {
  columnDefs: ColDef[];
  rowData: any[];
}

const AgGridTable: React.FC<AgGridTableProps> = ({ columnDefs, rowData }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: "520px", width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          flex: 1,
          minWidth: 100,
          cellStyle: { textAlign: "start" },
        }}
        paginationPageSize={10}
        pagination={true}
      />
    </div>
  );
};

export default AgGridTable;
