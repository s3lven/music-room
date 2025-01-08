"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { createNewRoom } from "@/utils/api";

const HomeForm = () => {
  const [username, setUsername] = useState("");
  const [action, setAction] = useState("create");
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username) {
      if (action === "create") {
        // Generate a random room ID
        const newRoom = await createNewRoom({username})
        const newRoomId = newRoom._id
        router.push(
          `/room/${newRoomId}?username=${encodeURIComponent(username)}`
        );
      } else {
        if (roomId) {
          router.push(
            `/room/${roomId}?username=${encodeURIComponent(username)}`
          );
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-md font-mali">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className=""
            />
          </div>
          <RadioGroup
            value={action}
            onValueChange={setAction}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="create" id="create" />
              <Label htmlFor="create">Create a new room</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="join" id="join" />
              <Label htmlFor="join">Join an existing room</Label>
            </div>
          </RadioGroup>
          {action === "join" && (
            <div className="space-y-2">
              <Label htmlFor="roomId">Room ID</Label>
              <Input
                id="roomId"
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required={action === "join"}
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full font-bold"
            variant={"secondary"}
          >
            {action === "create" ? "Create Room" : "Join Room"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HomeForm;
