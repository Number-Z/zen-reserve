"use server";

import { signIn, signOut } from "@/auth";
import type { SignInSchemaType } from "@/schemas/signIn";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(data: SignInSchemaType) {
  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
  redirect("/login");
}
