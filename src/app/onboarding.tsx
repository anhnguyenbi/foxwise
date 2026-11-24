import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, Ellipse, RadialGradient, Stop } from "react-native-svg";

import { images } from "@/constants/images";

// Ground shadow size: spans the mascot's body (backpack to right foot), short and flat
const SHADOW_WIDTH = 231;
const SHADOW_HEIGHT = 16;

type SpeechBubbleProps = {
  text: string;
  // Which way the tail points: down-right or down-left (toward the mascot)
  tail: "left" | "right";
  // Position + tilt of the whole bubble
  className: string;
  // Color classes, e.g. "bg-[#EEF4FF]" / "border-t-[#EEF4FF]" / "text-text-primary"
  bubbleClassName: string;
  tailClassName: string;
  textClassName: string;
};

function SpeechBubble({
  text,
  tail,
  className,
  bubbleClassName,
  tailClassName,
  textClassName,
}: SpeechBubbleProps) {
  const tailDirection = tail === "right" ? "speech-bubble__tail--right" : "speech-bubble__tail--left";

  return (
    <View className={className}>
      <View className={`speech-bubble ${bubbleClassName}`}>
        <Text className={`speech-bubble__text ${textClassName}`}>{text}</Text>
      </View>
      {/* Tail: a border triangle, colored by its top border */}
      <View className={`speech-bubble__tail ${tailDirection} ${tailClassName}`} />
    </View>
  );
}

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Content scrolls on short screens; the button below stays pinned and visible */}
      <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
        {/* Logo + app name */}
        <View className="mt-4 flex-row items-center justify-center">
          <Image source={images.mascotLogo} className="h-16 w-16" resizeMode="contain" />
          <Text className="-ml-1 font-poppins-semibold text-[28px] text-text-primary">foxwise</Text>
        </View>

        {/* Headline */}
        <View className="mt-6 px-9">
          <Text className="font-poppins-bold text-[30px] leading-[46px] text-text-primary">
            Your AI language
          </Text>
          <Text className="font-poppins-bold text-[30px] leading-[46px] text-text-primary">
            <Text className="text-lingua-deep-purple">teacher</Text>.
          </Text>
          <Text className="mt-3 font-poppins text-[14px] leading-[29px] text-text-secondary">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot + speech bubbles, right below the subtitle. Positions are relative to the screen center. */}
        <View className="relative mt-2 h-[400px] w-full">
          <SpeechBubble
            text="Hello!"
            tail="right"
            className="absolute left-9 top-[26px] -rotate-[8deg]"
            bubbleClassName="bg-[#EEF4FF]"
            tailClassName="border-t-[#EEF4FF]"
            textClassName="text-text-primary"
          />
          <SpeechBubble
            text="¡Hola!"
            tail="left"
            className="absolute left-1/2 top-[3px] ml-5 rotate-[6deg]"
            bubbleClassName="bg-[#F1F0FF]"
            tailClassName="border-t-[#F1F0FF]"
            textClassName="text-[#3B2FE0]"
          />
          <SpeechBubble
            text="你好!"
            tail="left"
            className="absolute right-6 top-[82px] -rotate-[6deg]"
            bubbleClassName="bg-[#FFF0EC]"
            tailClassName="border-t-[#FFF0EC]"
            textClassName="text-[#E8503A]"
          />

          {/* Soft ground shadow: one flat ellipse, darkest in the center, fading to transparent.
              Svg is positioned through a wrapping View so it can use className. */}
          <View className="absolute left-1/2 top-[384px] -ml-[131px]">
            <Svg width={SHADOW_WIDTH} height={SHADOW_HEIGHT}>
              <Defs>
                <RadialGradient id="shadowGradient" cx="50%" cy="50%" r="50%">
                  <Stop offset="0" stopColor="#000000" stopOpacity={0.16} />
                  <Stop offset="0.55" stopColor="#000000" stopOpacity={0.08} />
                  <Stop offset="1" stopColor="#000000" stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Ellipse
                cx={SHADOW_WIDTH / 2}
                cy={SHADOW_HEIGHT / 2}
                rx={SHADOW_WIDTH / 2}
                ry={SHADOW_HEIGHT / 2}
                fill="url(#shadowGradient)"
              />
            </Svg>
          </View>
          <Image
            source={images.mascotWelcome}
            className="absolute left-1/2 top-[10px] -ml-[212px] h-[435px] w-[435px]"
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* Call to action (no pagination dots) */}
      <View className="px-6 pb-6">
        <TouchableOpacity
          className="btn-primary px-8"
          activeOpacity={0.85}
          onPress={() => router.push("/sign-up")}
        >
          <Text className="btn-primary__label flex-1 text-center">Get Started</Text>
          <View className="h-3 w-3 -rotate-45 border-b-2 border-r-2 border-white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

