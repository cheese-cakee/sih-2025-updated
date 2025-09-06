const API_URL = "http://localhost:5000";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// frontend/src/api.ts
export const getBuses = async () => {
  const res = await fetch("http://localhost:5000/buses");
  return res.json();
};

