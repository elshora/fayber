import React from "react";
import { fetchStore } from "../actions/actions";
import StoreData from "./StoreData";
interface StoreWrapperProps{
  lng:string;
  storeid:string
}
export default async function StoreWrapper({ lng ,storeid}: StoreWrapperProps) {
  const store = await fetchStore(storeid);
  return <StoreData lng={lng} data={store} />;
}
