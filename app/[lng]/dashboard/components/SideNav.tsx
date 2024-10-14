import React from "react";
import NavLinks from "./NavLinks";
import { cn } from "@/lib/utils";
import SignOut from "./SignOut";

export default function SideNav({ lng }: LanguageToggleProps) {
  return (
    <SideBar
      lng={lng}
      className=" hidden lg:block dark:bg-graident-dark flex-1"
    />
  );
}

export const SideBar = ({
  className,
  lng,
}: {
  className?: string;
  lng: string;
}) => {
  return (
    <div className={className} style={{ width: 260 }}>
      <div
        className={cn(
          "h-full  p-10 space-y-5 lg:border-r flex flex-col bg-primary dark:bg-card fixed w-64"
        )}
        style={{ width: 260 }}
      >
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-3xl font-bold text-white">LOGO</h1>
          </div>
          <NavLinks lng={lng} />
        </div>
        <SignOut />
      </div>
    </div>
  );
};
