import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

import { getClerkErrorMessage } from "@/lib/clerk";

// The social providers enabled in the Clerk Dashboard
export type SocialStrategy = "oauth_google" | "oauth_facebook" | "oauth_apple";

// Signs in (or signs up) with a social provider through Clerk's browser-based SSO flow.
// Works in Expo Go and in development builds. New users get an account automatically.
export function useSocialAuth() {
  const { startSSOFlow } = useSSO();
  const [isLoading, setIsLoading] = useState(false);

  const signInWith = async (strategy: SocialStrategy) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      // No session means the user closed the browser: nothing to do.
      // Once the session is active, the root layout's auth guard shows the home screen.
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      Alert.alert("Sign in failed", getClerkErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return { signInWith, isLoading };
}
