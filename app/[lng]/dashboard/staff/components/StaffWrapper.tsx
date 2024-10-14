import React from "react";
import StaffData from "./StaffData";
interface StoreWrapperProps {
  lng: string;
}
export default async function StaffWrapper({ lng }: StoreWrapperProps) {
  return <StaffData lng={lng} />;
}
