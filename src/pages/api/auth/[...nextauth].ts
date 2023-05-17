import { login, register } from "@/http";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Enter your name" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Your Password",
        },
      },
      async authorize(credentials, req) {
        const { name, email, password } = credentials as any;
        
        try {
          let user;
          // Determine if the request is for registration or login based on the presence of a name
          // const dispatch = useDispatch();
          if (name) {
            const res = await register({
              name,
              email,
              password,
            });
            user = res.data;
          } else {
            const res = await login({
              email,
              password,
            });
            user = res.data;
          }

          if (user) {
            // dispatch(setAuth({ isAuthenticated: true, user }));
            // console.log(user)
            const role = user.user.role;
            user.role = role;
            // dispatchAuthAction(true, user);
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token, user }: any) {
      session.user = token;
      session.accessToken = token.token;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
