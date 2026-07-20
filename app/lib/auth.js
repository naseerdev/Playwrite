// Dummy credentials used to bypass real authentication.
export const DUMMY_EMAIL = "admin@example.com";
export const DUMMY_PASSWORD = "password123";

const AUTH_KEY = "isAuthenticated";

export function login(email, password) {
  if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, "true");
    }
    return true;
  }
  return false;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}
