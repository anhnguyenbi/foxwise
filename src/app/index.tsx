import { useAuth, useUser } from "@clerk/expo";
import { Pressable, Text, View } from "react-native";

// Temporary home screen until the real Home + tabs are built.
export default function Index() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-surface">
      <Text className="h2 text-lingua-purple">Foxwise</Text>
      <Text className="body-lg text-text-secondary">{user?.primaryEmailAddress?.emailAddress}</Text>
      {/* Signing out flips the auth guard in the root layout, which shows onboarding again */}
      <Pressable onPress={() => signOut()} hitSlop={10} accessibilityRole="button">
        <Text className="body-lg text-lingua-deep-purple underline">Sign out</Text>
      </Pressable>
    </View>
  );
}
