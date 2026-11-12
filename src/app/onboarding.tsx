import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/components/PrimaryButton";
import { SpeechBubble } from "@/components/SpeechBubble";
import { images } from "@/constants/images";

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Logo */}
      <View className="flex-row items-center justify-center">
        <Image
          source={images.mascotLogo}
          className="-mr-2 h-[88px] w-[88px]"
          resizeMode="contain"
        />
        <Text className="font-poppins-semibold text-[32px] text-text-primary">
          foxwise
        </Text>
      </View>

      {/* Headline */}
      <View className="mt-8 px-10">
        <Text className="font-poppins-bold text-[34px] leading-[46px] text-text-primary">
          Your AI language
        </Text>
        <Text className="font-poppins-bold text-[34px] leading-[46px] text-text-primary">
          <Text className="text-lingua-purple">teacher</Text>.
        </Text>
        <Text className="mt-4 font-poppins text-base leading-[29px] text-text-secondary">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Mascot + speech bubbles */}
      <View className="mt-4 flex-1">
        <View className="absolute bottom-[6%] left-[22%] right-[22%] h-5 rounded-full bg-black/[0.06]" />
        <Image
          source={images.mascotWelcome}
          className="absolute inset-0 h-full w-full"
          resizeMode="contain"
        />
        <SpeechBubble
          text="Hello!"
          bgClassName="bg-[#EAF3FF]"
          textClassName="text-text-primary"
          tail="right"
          className="left-[10%] top-[16%] -rotate-[8deg]"
        />
        <SpeechBubble
          text="¡Hola!"
          bgClassName="bg-[#F1F1FF]"
          textClassName="text-[#2F27E0]"
          tail="left"
          className="right-[8%] top-0 rotate-[8deg]"
        />
        <SpeechBubble
          text="你好!"
          bgClassName="bg-[#FDECE8]"
          textClassName="text-[#E8452C]"
          tail="left"
          className="right-[2%] top-[26%] -rotate-[8deg]"
        />
      </View>

      {/* CTA */}
      <View className="px-7 pb-6 pt-4">
        <PrimaryButton
          label="Get Started"
          onPress={() => router.push("/sign-up")}
        />
      </View>
    </SafeAreaView>
  );
}
