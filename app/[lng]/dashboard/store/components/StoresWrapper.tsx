import React from "react";
import { fetchStores } from "../actions/actions";
import StoresData from "./StoresData";
interface StoreWrapperProps {
  lng: string;
}
export default async function StoresWrapper({ lng }: StoreWrapperProps) {
  const store = await fetchStores();
  return <StoresData lng={lng} data={store} />;
}
