import { login } from "@/http";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
        const { email, password } = credentials as any;


        try {
          const res = await login({
            email,
            password,
          });
          const user = res.data.user; // assuming the user object is returned under the "user" key
          if (user) {
            // add role information to the returned user object
            const role = user.role;
            user.role = role;
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }

        // try {
        //   const res = await login({
        //     email,
        //     password,
        //   });
        //   console.log("This data that i want", res.data)
        //   const user = await res.data.success==true;
        //   if (user) {
        //     // console.log(user);
        //     return user
        //   }else return null;
        // } catch (error) {
        //   console.log(error);
        // }

        // // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null;

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
    // ...add more providers here
  ],
  callbacks:{
    async jwt({token, user}) {
      return ({...token, ...user})
    },

    async session({session, token, user}){
      session.user = token;
      return session;
    }
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
