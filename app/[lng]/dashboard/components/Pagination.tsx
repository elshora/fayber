import React, { useEffect, useState } from "react";
import { ICellRendererParams, GridApi } from "ag-grid-community";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomPaginationProps {
  data: any;
  pageSize?: number;
  totalPages: number;
  onChange: Function;
  currentPage: number;
}

const CustomPagination = ({
  data,
  pageSize = 10,
  totalPages,
  onChange,
  currentPage,
}: CustomPaginationProps) => {
  return (
    <>
      {data.length > pageSize && (
        <ul className={"pagination gap-2"} style={{ color: "#525252" }}>
          <li>
            <ChevronLeft />
          </li>
          <li>
            <button
              className={`pageButton ${currentPage === 1 ? "disabled" : ""}`}
              style={{ fontSize: "16px", color: "#525252" }}
              onClick={() => onChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`pageButton ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => onChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className={`pageButton ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => onChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
          <li>
            <ChevronRight />
          </li>
        </ul>
      )}
    </>
  );
};

export default CustomPagination;
