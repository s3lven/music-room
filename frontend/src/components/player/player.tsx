"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import React, { useEffect, useState } from "react";

const Player = ({ accessToken }: { accessToken: unknown }) => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Web Playback SDN",
        getOAuthToken: (cb) => cb(accessToken as string),
        volume: 0.5,
      });

      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Player is ready with device ID:", device_id);
        setDeviceId(device_id);
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline:", device_id);
      });

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;
        console.log("Player state changed:", state);

        setCurrentTrack(state.track_window.current_track);
        setIsPaused(state.paused);

        spotifyPlayer.getCurrentState().then((state) => {
          if (!state) {
            setIsActive(false);
          } else {
            setIsActive(true);
          }
        });
      });

      spotifyPlayer?.connect();

      return (() => {
        spotifyPlayer?.disconnect()
      })

    };
  }, [accessToken]);

  if (!isActive) {
    return (
      <div>
        Instance not active. Transfer your playback using your Spotify app
      </div>
    );
  } else {
    return (
      <div>
        <div>Device ID: {deviceId}</div>
        <div>{currentTrack?.name}</div>
        <button onClick={() => player?.previousTrack()}>
          <SkipBack />
        </button>
        <button onClick={() => player?.togglePlay()}>
          {isPaused ? <Play /> : <Pause />}
        </button>
        <button onClick={() => player?.nextTrack()}>
          <SkipForward />
        </button>
      </div>
    );
  }
};

export default Player;
