import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors } from "@/theme";

type AuthMode = "sign-up" | "sign-in";

// Everything that differs between the two screens
const copy = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    button: "Sign Up",
    footerText: "Already have an account? ",
    footerLink: "Log in",
    footerHref: "/sign-in",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey ✨",
    button: "Sign In",
    footerText: "Don't have an account? ",
    footerLink: "Sign up",
    footerHref: "/sign-up",
  },
} as const satisfies Record<AuthMode, Record<string, string>>;

const socialProviders: { label: string; icon: ImageSourcePropType }[] = [
  { label: "Continue with Google", icon: images.iconGoogle },
  { label: "Continue with Facebook", icon: images.iconFacebook },
  { label: "Continue with Apple", icon: images.iconApple },
];

export function AuthScreen({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const text = copy[mode];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleVerified = () => {
    setVerifying(false);
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View className="px-7 pt-2">
            {/* Back */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="auth-back"
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <View className="auth-back__chevron" />
            </TouchableOpacity>

            {/* Heading */}
            <Text className="auth-title mt-3">{text.title}</Text>
            <Text className="auth-subtitle">{text.subtitle}</Text>
          </View>

          {/* Mascot (mirrored + cropped so it peeks over the form) */}
          <View className="mt-2 h-[165px] items-center overflow-hidden">
            <Image
              source={images.mascotAuth}
              className="-mt-10 h-[260px] w-[260px]"
              style={{ transform: [{ scaleX: -1 }] }}
              resizeMode="contain"
            />
            <Text
              className="auth-sparkle left-1/2 top-[30px] -ml-[100px] text-[18px] text-[#F5A524]"
              style={{ pointerEvents: "none" }}
            >
              ✦
            </Text>
            <Text
              className="auth-sparkle left-1/2 top-[38px] ml-[88px] text-[16px] text-lingua-blue"
              style={{ pointerEvents: "none" }}
            >
              ✦
            </Text>
            <Text
              className="auth-sparkle left-1/2 top-[70px] ml-[78px] text-[15px] text-warning"
              style={{ pointerEvents: "none" }}
            >
              ✦
            </Text>
          </View>

          <View className="px-7">
            {/* Email */}
            <View className="auth-field">
              <Text className="auth-field__label">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#B6BAC9"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                className="auth-field__input"
              />
            </View>

            {/* Password (sign up only) */}
            {mode === "sign-up" && (
              <View className="auth-field mt-3.5">
                <Text className="auth-field__label">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#B6BAC9"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  className="auth-field__input"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((value) => !value)}
                  className="auth-field__toggle"
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  <Image
                    source={showPassword ? images.iconEyeOff : images.iconEye}
                    className="h-6 w-6"
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Main button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setVerifying(true)}
              className="auth-button mt-5"
            >
              <Text className="auth-button__label">{text.button}</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="auth-divider">
              <View className="auth-divider__line" />
              <Text className="auth-divider__label">or continue with</Text>
              <View className="auth-divider__line" />
            </View>

            {/* Social auth (wired up with Clerk later) */}
            <View className="mt-5 gap-2.5">
              {socialProviders.map((provider) => (
                <TouchableOpacity
                  key={provider.label}
                  activeOpacity={0.7}
                  className="social-button"
                >
                  <Image
                    source={provider.icon}
                    className="social-button__icon"
                    resizeMode="contain"
                  />
                  <Text className="social-button__label">{provider.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View className="flex-1 items-center justify-end px-7 pb-6 pt-8">
            <Text className="auth-footer">
              {text.footerText}
              <Text
                className="auth-footer__link"
                onPress={() => router.replace(text.footerHref)}
              >
                {text.footerLink}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={verifying}
        email={email.trim()}
        onClose={() => setVerifying(false)}
        onVerified={handleVerified}
      />
    </SafeAreaView>
  );
}

const styles = {
  content: { flexGrow: 1 },
} as const;
