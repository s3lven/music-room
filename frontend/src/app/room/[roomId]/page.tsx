import { auth } from "@/auth";
import Chat from "@/components/chat/chat";
import Player from "@/components/player/player";
// import Playlists from "@/components/playlists";

import React from "react";

const RoomPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { username } = await searchParams;
  const { roomId } = await params;
  const session = await auth();

  if (!session) {
    console.error("User is not authenticated");
    return null;
  }

  if (!username) {
    console.error("There is no username!");
    return;
  }

  return (
    <div className="w-full h-full flex gap-4 mx-auto">
      <Chat roomId={roomId} username={username} />
      {/* <Playlists /> */}
      <Player accessToken={session.accessToken} />
    </div>
  );
};

export default RoomPage;
