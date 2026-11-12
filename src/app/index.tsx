import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background px-6">
      <Text className="h2 text-lingua-purple">Foxwise</Text>
      <Link href="/onboarding" className="h4 text-lingua-deep-purple">
        Open onboarding
      </Link>
    </View>
  );
}
