import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";

interface DecodedToken {
  sub: {
    username: string;
    userid: string;
  };
  [key: string]: any;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      access_token: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    access_token: string;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = {
            username: credentials?.username,
            password: credentials?.password,
            user_type: 'company_admins',
          };
          const headers = {
            "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
          };
    
          const res = await axios.post("http://109.123.252.176:5000/api/login", data, {
            headers: headers,
          });
          if (res.status === 200) {
            const { access_token } = res.data;
            const decodedToken = jwt.decode(access_token) as any;
            if (decodedToken && typeof decodedToken.sub === "object") {
              return {
                username: decodedToken.sub.username || credentials?.username,
                id: decodedToken.sub.userid,
                access_token: access_token,
              };
            } else {
              throw new Error("Invalid token structure");
            }
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Authentication Error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.access_token = token.access_token;
      return session;
    },
  },
};

export { authOptions };
