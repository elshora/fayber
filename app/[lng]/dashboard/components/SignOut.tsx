"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React,{ useTransition } from "react";

export default function SignOut() {
  const [isPending, startTransition] = useTransition();
  const onSubmit = async () => {
        startTransition(async () => {
          await signOut();
        });
  };

  return (
    <div>
      <form action={onSubmit}>
        <Button className="gap-2 bg-transparent text-white">
          <LogOut strokeWidth={1.5} />
          SignOut
        </Button>
      </form>
    </div>
  );
}
