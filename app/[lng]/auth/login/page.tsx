import React from "react";
import { LoginForm } from "./components/LoginForm";
export default async function page() {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex h-full bg-primary dark:bg-card items-center justify-center flex-1">
        <div className="text-white">LOGO</div>
      </div>
      <div className="h-full flex items-center justify-center flex-1">
        <div className="bg-card rounded-md px-4 py-8  min-w-80 ">
          <h2 className="text-primary font-bold text-2xl mb-2">
            Welcome Back!
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
