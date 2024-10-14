"use client";
import { useTranslation } from "@/app/i18n/client";
import React from "react";
import UserCard from "./UserCard";

export default function CoventantData({
  lng,
  convenantUsers,
}: {
  lng: string;
  convenantUsers: ConvenantUser[];
}) {
  const { t } = useTranslation(lng, "covenant");
  return convenantUsers.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {convenantUsers.map((user, i) => (
        <div key={i}>
          <UserCard lng={lng} user={user} />
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      There are no data
    </div>
  );
}
