const API_URL = "http://localhost:5000";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const getBuses = async (token: string) => {
  const res = await fetch(`${API_URL}/buses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
