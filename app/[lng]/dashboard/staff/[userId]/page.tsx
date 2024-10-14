import React from "react";
import { EmployeeForm } from "../components/EmployeeForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from "@/lib/axios";
import { fetchRoles } from "../actions";

type Params = {
  params: {
    userId: string;
    lng: string;
  };
};
export default async function Index({ params: { userId, lng } }: Params) {
  const session = await getServerSession(authOptions);
  const fetchUser = async (): Promise<StaffMember> => {
    try {
      const res = await axios.get(
        `http://109.123.252.176:5000/api/staff?id=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session?.user.access_token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return {
        id: "",
        picture_url: "",
        username: "",
        first_name: "",
        second_name: "",
        phone_number: "",
        address: "",
        job_title: "project_manager",
        roles: "",
        age: undefined,
        academic_qualifications: "",
        graduation_year: "",
        university: "",
        current_position: "",
        previous_job: "",
        national_id_number: "",
        salary: undefined,
        additional_information: "",
      };
    }
  };
  const user = await fetchUser();
  const roles = await fetchRoles();
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      {/* @ts-ignore */}
      <EmployeeForm type="edit" defaultValues={user} lng={lng} roles={roles} />
    </div>
  );
}
