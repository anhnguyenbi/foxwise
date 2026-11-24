import { isClerkAPIResponseError } from "@clerk/expo";

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

// Turns a Clerk error into a short, user-friendly message for an alert.
export function getClerkErrorMessage(error: unknown): string {
  // Errors returned by Clerk's API (wrong code, email already taken, weak password...)
  if (isClerkAPIResponseError(error)) {
    const firstError = error.errors[0];
    return firstError?.longMessage ?? firstError?.message ?? FALLBACK_MESSAGE;
  }

  // Other Clerk errors carry a readable `longMessage`
  if (error instanceof Error && "longMessage" in error && typeof error.longMessage === "string") {
    return error.longMessage;
  }

  return FALLBACK_MESSAGE;
}
