import { authConfig } from "@/auth.config";
import { signInSchema } from "@/schemas/signIn";
import { getAdminByEmail } from "@/services/auth/getAdminByEmail";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials =
          await signInSchema.safeParseAsync(credentials);

        if (parsedCredentials.error) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = parsedCredentials.data;
        const user = await getAdminByEmail(email);
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
});
