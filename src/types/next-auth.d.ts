import { User } from "./userInterface";

declare module "next-auth"{
    interface Session{
        user:User
    }
}