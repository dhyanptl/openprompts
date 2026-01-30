const API_URL = import.meta.env.VITE_API_URL;

export async function signIn(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function signUp(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getSession() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;
  return res.json();
}
