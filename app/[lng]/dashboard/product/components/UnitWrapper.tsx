import React from "react";
import UnitData from "./UnitData";
import { fetchUnits } from "../actions/actions";
export default async function UnitWrapper({ lng }: LanguageToggleProps) {
  const data: Unit[] = await fetchUnits();
  return (
    <>
      <UnitData lng={lng} data={data} />
    </>
  );
}
