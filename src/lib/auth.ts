import { supabase } from "./supabase";

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserRole(): Promise<"admin" | "client" | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  return (session.user.app_metadata?.role as "admin" | "client") ?? null;
}

export async function updatePassword(newPassword: string) {
  return supabase.auth.updateUser({ password: newPassword });
}
