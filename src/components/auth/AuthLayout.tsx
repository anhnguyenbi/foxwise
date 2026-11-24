import { useRouter } from "expo-router";
import type { ReactNode } from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppleIcon, ChevronLeftIcon, FacebookIcon, GoogleIcon, SparkleIcon } from "@/components/icons";
import { images } from "@/constants/images";
import { useSocialAuth, type SocialStrategy } from "@/hooks/useSocialAuth";

const SOCIAL_PROVIDERS: { label: string; strategy: SocialStrategy; Icon: typeof GoogleIcon }[] = [
  { label: "Continue with Google", strategy: "oauth_google", Icon: GoogleIcon },
  { label: "Continue with Facebook", strategy: "oauth_facebook", Icon: FacebookIcon },
  { label: "Continue with Apple", strategy: "oauth_apple", Icon: AppleIcon },
];

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  onSubmit: () => void;
  // Disables the main button while a request is running
  isSubmitting?: boolean;
  footerPrompt: string;
  footerLinkLabel: string;
  onFooterLinkPress: () => void;
  // The form fields (email, password...)
  children: ReactNode;
  // Optional content between the fields and the main button (e.g. the password strength indicator)
  belowFields?: ReactNode;
};

// Shared layout for the Sign Up and Sign In screens.
export function AuthLayout({
  title,
  subtitle,
  submitLabel,
  onSubmit,
  isSubmitting = false,
  footerPrompt,
  footerLinkLabel,
  onFooterLinkPress,
  children,
  belowFields,
}: AuthLayoutProps) {
  const router = useRouter();
  const { signInWith, isLoading: isSocialLoading } = useSocialAuth();

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/onboarding");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Fills the screen and doesn't scroll when everything fits. It only scrolls on very short phones,
          or while the keyboard is open (automaticallyAdjustKeyboardInsets keeps the focused field visible). */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
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
        <Text className="mt-[24px] font-poppins-bold text-[30px] leading-[40px] text-text-primary">
          {title}
        </Text>
        <Text className="mt-[8px] font-poppins text-[16px] leading-[24px] text-text-secondary">{subtitle}</Text>

        {/* Mascot peeking over the first field. The artwork fills 18%–83% of the PNG's height, so in a
            190px image box the ears start ~34px down and the resting paw sits ~158px down, overlapping
            the card's top edge by ~4px. Rendered above the card, and ignores touches so its transparent
            padding doesn't block the Email field. */}
        <View className="relative mt-[20px] h-[120px]" style={{ zIndex: 1, pointerEvents: "none" }}>
          <Image
            source={images.mascotAuth}
            className="absolute left-1/2 -top-[34px] -ml-[88px] h-[190px] w-[190px]"
            // Mirror the mascot so it waves with the paw on the left
            style={{ transform: [{ scaleX: -1 }] }}
            resizeMode="contain"
          />
          <View className="absolute left-1/2 top-[17px] -ml-[88px]">
            <SparkleIcon size={14} color="#F7A531" />
          </View>
          <View className="absolute left-1/2 top-[25px] ml-[85px]">
            <SparkleIcon size={11} color="#7DA9FF" />
          </View>
          <View className="absolute left-1/2 top-[52px] ml-[73px]">
            <SparkleIcon size={15} color="#FFD54A" />
          </View>
        </View>

        {/* Form fields */}
        <View className="gap-[14px]">{children}</View>
        {belowFields}

        {/* Main action: a bit closer when there is content below the fields */}
        <TouchableOpacity
          className={`btn-gradient ${belowFields ? "mt-[12px]" : "mt-[18px]"}`}
          activeOpacity={0.85}
          onPress={onSubmit}
          disabled={isSubmitting}
        >
          <Text className="btn-primary__label">{submitLabel}</Text>
        </TouchableOpacity>

        {/* Divider (same spacing on Sign Up and Sign In) */}
        <View className="divider mt-[18px]">
          <View className="divider__line" />
          <Text className="divider__text">or continue with</Text>
          <View className="divider__line" />
        </View>

        {/* Social auth through Clerk SSO (signs in existing users, signs up new ones) */}
        <View className="mt-[12px] gap-[8px]">
          {SOCIAL_PROVIDERS.map(({ label, strategy, Icon }) => (
            <TouchableOpacity
              key={label}
              className="social-btn"
              activeOpacity={0.7}
              onPress={() => signInWith(strategy)}
              disabled={isSocialLoading}
            >
              <Icon size={20} />
              <Text className="social-btn__label">{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer pinned to the bottom; any spare height goes above it */}
        <View className="mt-auto flex-row items-center justify-center pt-[16px]">
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
