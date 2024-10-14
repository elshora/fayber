import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
export const fetchStaff = async (): Promise<StaffMember[]> => {
  const endpoint = `http://109.123.252.176:5000/api/staff?page_size=10&page_number=1`;
  const session = await getServerSession(authOptions);

  try {
    const res = await axios.get(
      "http://109.123.252.176:5000/api/staff?page_size=10&page_number=1",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      }
    );
    console.log(res);

    return res.data ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const fetchRoles = async (): Promise<UserRole[]> => {
  const endpoint = `http://109.123.252.176:5000/api/roles`;
  const session = await getServerSession(authOptions);
  try {
    const res = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${session?.user.access_token}`,
      },
    });
    return res.data ?? [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
