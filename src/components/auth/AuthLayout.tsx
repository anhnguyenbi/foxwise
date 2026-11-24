import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppleIcon, ChevronLeftIcon, FacebookIcon, GoogleIcon, SparkleIcon } from "@/components/icons";
import { images } from "@/constants/images";

const SOCIAL_PROVIDERS = [
  { label: "Continue with Google", Icon: GoogleIcon },
  { label: "Continue with Facebook", Icon: FacebookIcon },
  { label: "Continue with Apple", Icon: AppleIcon },
];

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  onSubmit: () => void;
  footerPrompt: string;
  footerLinkLabel: string;
  onFooterLinkPress: () => void;
  // The form fields (email, password...)
  children: ReactNode;
};

// Shared layout for the Sign Up and Sign In screens.
export function AuthLayout({
  title,
  subtitle,
  submitLabel,
  onSubmit,
  footerPrompt,
  footerLinkLabel,
  onFooterLinkPress,
  children,
}: AuthLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/onboarding");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        {/* Back button */}
        <Pressable
          className="mt-[16px] self-start"
          hitSlop={12}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ChevronLeftIcon size={24} />
        </Pressable>

        {/* Title + subtitle */}
        <Text className="mt-[26px] font-poppins-bold text-[30px] leading-[40px] text-text-primary">
          {title}
        </Text>
        <Text className="mt-[8px] font-poppins text-[16px] leading-[24px] text-text-secondary">{subtitle}</Text>

        {/* Mascot peeking over the first field: its resting paw (bottom of the PNG content, ~166px down
            the 202px image box) overlaps the card's top edge by ~4px. Rendered above the card, and
            ignores touches so its transparent padding doesn't block the Email field. */}
        <View className="relative mt-[25px] h-[126px]" style={{ zIndex: 1, pointerEvents: "none" }}>
          <Image
            source={images.mascotAuth}
            className="absolute left-1/2 -top-[36px] -ml-[94px] h-[202px] w-[202px]"
            // Mirror the mascot so it waves with the paw on the left
            style={{ transform: [{ scaleX: -1 }] }}
            resizeMode="contain"
          />
          <View className="absolute left-1/2 top-[18px] -ml-[94px]">
            <SparkleIcon size={14} color="#F7A531" />
          </View>
          <View className="absolute left-1/2 top-[26px] ml-[90px]">
            <SparkleIcon size={11} color="#7DA9FF" />
          </View>
          <View className="absolute left-1/2 top-[55px] ml-[78px]">
            <SparkleIcon size={15} color="#FFD54A" />
          </View>
        </View>

        {/* Form fields */}
        <View className="gap-[14px]">{children}</View>

        {/* Main action */}
        <TouchableOpacity className="btn-gradient mt-[18px]" activeOpacity={0.85} onPress={onSubmit}>
          <Text className="btn-primary__label">{submitLabel}</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="divider mt-[24px]">
          <View className="divider__line" />
          <Text className="divider__text">or continue with</Text>
          <View className="divider__line" />
        </View>

        {/* Social auth (UI only for now; wired up with Clerk later) */}
        <View className="mt-[12px] gap-[10px]">
          {SOCIAL_PROVIDERS.map(({ label, Icon }) => (
            <TouchableOpacity key={label} className="social-btn" activeOpacity={0.7} onPress={() => {}}>
              <Icon size={22} />
              <Text className="social-btn__label">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer pinned to the bottom when there is spare space */}
        <View className="mt-auto flex-row items-center justify-center pt-[24px]">
          <Text className="font-poppins text-[15px] leading-[22px] text-text-secondary">{footerPrompt} </Text>
          <Pressable hitSlop={10} onPress={onFooterLinkPress} accessibilityRole="link">
            <Text className="font-poppins-medium text-[15px] leading-[22px] text-lingua-deep-purple">
              {footerLinkLabel}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
