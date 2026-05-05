export const MOCK_CLIENT_SESSION_KEY = "elaris-client-session";

export const MOCK_CLIENT = {
  companyAccessName: "silva-cafe",
  defaultPassword: "demo123",
};

export const MOCK_CLIENT_PASSWORD_KEY = "elaris-client-password";

export function getMockClientPassword() {
  if (typeof window === "undefined") return MOCK_CLIENT.defaultPassword;

  return (
    localStorage.getItem(MOCK_CLIENT_PASSWORD_KEY) ??
    MOCK_CLIENT.defaultPassword
  );
}

export function validateMockClientLogin(
  companyAccessName: string,
  password: string,
) {
  return (
    companyAccessName.trim().toLowerCase() === MOCK_CLIENT.companyAccessName &&
    password === getMockClientPassword()
  );
}

export function updateMockClientPassword(newPassword: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem(MOCK_CLIENT_PASSWORD_KEY, newPassword);
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