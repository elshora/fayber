import NextAuth from "next-auth";
import { authOptions } from "./authOptions";  // Adjust this import path if needed

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };