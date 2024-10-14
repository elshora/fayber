import React from "react";
import CategoryData from "./CategoryData";
import { fetchCategories } from "../actions/actions";

export default async function CategoryWrapper({ lng }: LanguageToggleProps) {
  const data: Category[] = await fetchCategories();
  return <CategoryData lng={lng} data={data} />;
}
