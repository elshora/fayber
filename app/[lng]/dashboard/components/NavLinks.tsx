"use client";import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Banknote,
  Box,
  Boxes,
  LayoutDashboard,
  Pickaxe,
  Store,
  Users,
} from "lucide-react";

import { useTranslation } from "../../../i18n/client";

export default function NavLinks({ lng }: LanguageToggleProps) {
  const pathname = usePathname();
  const { t } = useTranslation(lng, "layout");
  const links = [
    {
      href: `/${lng}/dashboard/orders?pageNumber=1`,
      text: t("orders"),
      Icon: Box,
    },
    {
      href: `/${lng}/dashboard/projects`,
      text: t("projects"),
      Icon: LayoutDashboard,
    },
    {
      href: `/${lng}/dashboard/staff`,
      text: t("staff"),
      Icon: Users,
    },
    {
      href: `/${lng}/dashboard/contractors`,
      text: t("contractors"),
      Icon: Pickaxe,
    },
    {
      href: `/${lng}/dashboard/store`,
      text: t("store"),
      Icon: Store,
    },
    {
      href: `/${lng}/dashboard/product`,
      text: t("product"),
      Icon: Boxes,
    },
    {
      href: `/${lng}/dashboard/covenant`,
      text: t("covenant"),
      Icon: Banknote,
    },
  ];
  return (
    <div className="space-y-5">
      {links.map((link, index) => {
        const Icon = link.Icon;
        return (
          <Link
            onClick={() => document.getElementById("sidebar-close")?.click()}
            href={link.href}
            key={index}
            className={cn(
              "flex items-center gap-2 rounded-sm py-1 px-2 text-white capitalize",
              {
                "bg-white  text-primary dark:text-black ":
                  pathname === link.href,
              }
            )}
          >
            <Icon />
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
