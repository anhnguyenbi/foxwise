import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-surface">
      <Text className="h2 text-lingua-purple">Foxwise</Text>
      <Link href="/onboarding" className="body-lg text-lingua-deep-purple underline">
        Open onboarding
      </Link>
    </View>
  );
}
