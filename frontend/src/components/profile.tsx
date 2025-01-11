import { auth } from "@/auth";
import React from "react";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";

const Profile = async () => {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <div>
          {session.user.name}
          <SignOut />
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default Profile;
