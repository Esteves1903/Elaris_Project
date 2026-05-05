export const MOCK_CLIENT_SESSION_KEY = "elaris-client-session";

const MOCK_CLIENT = {
  companyAccessName: "silva-cafe",
  password: "demo123",
};

export function validateMockClientLogin(
  companyAccessName: string,
  password: string,
) {
  return (
    companyAccessName.trim().toLowerCase() === MOCK_CLIENT.companyAccessName &&
    password === MOCK_CLIENT.password
  );
}

export function createMockClientSession() {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    MOCK_CLIENT_SESSION_KEY,
    JSON.stringify({
      isLoggedIn: true,
      companyAccessName: MOCK_CLIENT.companyAccessName,
      loggedInAt: new Date().toISOString(),
    }),
  );
}

export function hasMockClientSession() {
  if (typeof window === "undefined") return false;

  const session = localStorage.getItem(MOCK_CLIENT_SESSION_KEY);

  if (!session) return false;

  try {
    const parsedSession = JSON.parse(session);

    return parsedSession?.isLoggedIn === true;
  } catch {
    return false;
  }
}

export function clearMockClientSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(MOCK_CLIENT_SESSION_KEY);
}