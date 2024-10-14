"use client";
import React, { useEffect } from "react";
import axios from "axios"; // Import Axios
import { useAppSelector, useAppStore } from "@/lib/hooks";
import UserCard from "./UserCard";
import EmptyData from "./EmtyData";
import { addAllStaff } from "@/lib/features/staff/staffSlice";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

interface StoresPropsTypes {
  lng: string;
}

export default function StaffData({ lng }: StoresPropsTypes) {
  const store = useAppStore();
  const axiosAuth = useAxiosAuth();
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const endpoint = `/staff?page_size=1000&page_number=1`;
        const res = await axiosAuth.get(endpoint);
        const data = res.data.data.records;

        store.dispatch(addAllStaff(data));
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaff();
  }, []);

  const staff = useAppSelector((state) => state.staff.staff);

  return (
    <div>
      {staff && staff.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {staff.map((staffMember, i) => (
            <div key={i}>
              <UserCard lng={lng} staffMember={staffMember} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
}
