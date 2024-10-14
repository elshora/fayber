"use client";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";

function Permissions({ selectedRole, setSelectedRole, setPermissions }: any) {
  const [roles, setRoles] = useState<any>([]);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await axiosAuth.get("roles");
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    fetchRoles();
  }, [axiosAuth]);
    // <div className="flex space-x-2">
    //   {roles.length > 0 &&
    //     roles.map((role: any) => (
    //       <label
    //         key={role?.id}
    //         className={`px-4 py-2 rounded-md ${
    //           selectedRole === role?.id
    //             ? "bg-[#007EAE] text-white"
    //             : "bg-[#007dae44] "
    //         }`}
    //         onClick={() => {
    //           setPermissions(role.permissions);
    //           setSelectedRole(role?.id);
    //         }}
    //       >
    //         {role?.name}
    //       </label>
    //     ))}
    // </div>;
  return (
    <RadioGroup defaultValue="">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
  );
}

export default Permissions;
