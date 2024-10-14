import React from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { fetchRoles } from "../actions";

export default async function Index({
  params: { lng },
}: {
  params: LanguageToggleProps;
}) {
  const roles = await fetchRoles();
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <EmployeeForm type="add" lng={lng} roles={roles} />
    </div>
  );
}
