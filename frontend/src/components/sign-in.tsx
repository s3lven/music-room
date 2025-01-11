import { signIn } from "@/auth";
import React from "react";

export const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify");
      }}
    >
      <button type="submit">Sign In with Spotify</button>
    </form>
  );
};
