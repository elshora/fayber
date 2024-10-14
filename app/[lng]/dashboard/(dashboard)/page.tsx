import { redirect } from "next/navigation";
import React from "react";

export default function Dashboard() {
  return redirect("/dashboard/orders");

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
