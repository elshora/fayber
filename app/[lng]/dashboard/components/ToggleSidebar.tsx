"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Menu } from "lucide-react";
export default function ToggleSidebar() {
  return (
    <Button
      variant="outline"
      className="block lg:hidden p-2"
      onClick={() => document.getElementById("toggle-sidebar")?.click()}
    >
      <Menu strokeWidth={1.5} />
    </Button>
  );
}
