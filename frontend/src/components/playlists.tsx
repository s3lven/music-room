import { auth } from "@/auth";
import React from "react";
import { Paging, SimplifiedPlaylist } from "spotify-types";

const Playlists = async () => {
  const session = await auth();

  if (!session) return <div>No User</div>;

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  const playlists: Paging<SimplifiedPlaylist> = await response.json();
  console.log(playlists);
  
  return (
    <div>
      {playlists.items.map((playlist) => (
        <div key={playlist.id}>{playlist.name}</div>
      ))}
    </div>
  );
};

export default Playlists;
