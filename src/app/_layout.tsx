import "../global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { fontAssets } from "@/theme";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

export default function RootLayout() {
  return (
    // tokenCache keeps the session in secure storage, so users stay signed in after restarting the app
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}

// Lives inside ClerkProvider so it can read the auth state.
function RootNavigator() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const { isLoaded, isSignedIn } = useAuth();

  // Keep the splash screen up until fonts are ready and Clerk has restored the session
  const isReady = (fontsLoaded || !!fontError) && isLoaded;

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Signed in: only the home route is reachable.
          redirectTo is required: without it Expo Router falls back to the first unguarded route
          in file order, which is (auth)/sign-in, not onboarding. */}
      <Stack.Protected guard={!!isSignedIn} redirectTo="/onboarding">
        <Stack.Screen name="index" />
      </Stack.Protected>

      {/* Signed out: onboarding and the auth screens (opened from onboarding's Get Started) */}
      <Stack.Protected guard={!isSignedIn} redirectTo="/">
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="(auth)/sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
