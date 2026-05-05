export const MOCK_ADMIN_SESSION_KEY = "elaris-admin-session";

const MOCK_ADMIN = {
  username: "elaris-admin",
  password: "admin123",
};

export function validateMockAdminLogin(username: string, password: string) {
  return (
    username.trim().toLowerCase() === MOCK_ADMIN.username &&
    password === MOCK_ADMIN.password
  );
}

export function createMockAdminSession() {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    MOCK_ADMIN_SESSION_KEY,
    JSON.stringify({
      isLoggedIn: true,
      username: MOCK_ADMIN.username,
      loggedInAt: new Date().toISOString(),
    }),
  );
}

export function hasMockAdminSession() {
  if (typeof window === "undefined") return false;

  const session = localStorage.getItem(MOCK_ADMIN_SESSION_KEY);

  if (!session) return false;

  try {
    const parsedSession = JSON.parse(session);

    return parsedSession?.isLoggedIn === true;
  } catch {
    return false;
  }
}

export function clearMockAdminSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(MOCK_ADMIN_SESSION_KEY);
}
