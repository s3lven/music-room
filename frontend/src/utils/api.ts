const API_URL = "http://localhost:3000/api/v1";

export const createNewRoom = async ({ username }: { username: string }) => {
  try {
    const body = {
      name: "A new room",
      createdBy: username,
    };

    const response = await fetch(`${API_URL}/rooms`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error creating a new room");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
