// for mock test
// CHANGE THIS LATER FOR PROD
const USER_ID_KEY = "iit_user_id";

export function getUserIdentifier(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let userId = localStorage.getItem(USER_ID_KEY);

  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
}
