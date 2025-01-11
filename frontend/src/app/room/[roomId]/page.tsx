import Chat from "@/components/chat/chat";
import Playlists from "@/components/playlists";

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

  if (!username) {
    console.error("There is no username!");
    return;
  }

  return (
    <div className=" h-full flex gap-4">
      <Chat roomId={roomId} username={username} />
      <Playlists />
    </div>
  );
};

export default RoomPage;
