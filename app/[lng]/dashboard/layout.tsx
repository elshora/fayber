import React from "react";
import SideNav from "./components/SideNav";
import MobileSideNav from "./components/MobileSideNav";
import Header from "./components/Header";

export default async function Layout({
  children,
  params: { lng },
}: RootLayoutProps) {
  return (
    <div className="w-full flex ">
      <div className="h-screen flex flex-col ">
        <SideNav lng={lng} />
        <MobileSideNav lng={lng} />
      </div>

      <div className="w-full bg-white dark:bg-inherit">
        <Header lng={lng} />
        <div className="w-full sm:flex-1 p-5 sm:p-10 space-y-5 dark:bg-inherit">
          {children}
        </div>
      </div>
    </div>
  );
}
