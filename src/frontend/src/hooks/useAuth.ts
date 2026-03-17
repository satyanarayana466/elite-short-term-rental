import { useInternetIdentity } from "./useInternetIdentity";

export function useAuth() {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();

  return {
    login,
    logout: clear,
    loginStatus,
    identity,
    isInitializing,
    isLoggedIn: !!identity,
    isLoggingIn: loginStatus === "logging-in",
  };
}
