import { signIn } from "@/auth";
import React from "react";

export const SignInClient = () => {
  return <button onClick={() => signIn()}>Sign In</button>;
};
