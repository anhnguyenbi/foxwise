import { useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthTextField } from "@/components/auth/AuthTextField";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { VerificationCodeModal } from "@/components/auth/VerificationCodeModal";
import { getClerkErrorMessage } from "@/lib/clerk";

export default function SignUp() {
  const router = useRouter();
  const { signUp, fetchStatus } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Step 1: create the account, then email a 6-digit code
  const handleSignUp = async () => {
    const { error } = await signUp.password({ emailAddress: email.trim(), password });
    if (error) {
      Alert.alert("Sign up failed", getClerkErrorMessage(error));
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      Alert.alert("Couldn't send the code", getClerkErrorMessage(sendError));
      return;
    }

    setIsVerifying(true);
  };

  // Step 2: check the code, then turn the sign-up into an active session.
  // The root layout's auth guard then shows the home screen.
  const handleVerify = async (code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      Alert.alert("Invalid code", getClerkErrorMessage(error));
      return false;
    }

    if (signUp.status !== "complete") {
      Alert.alert("Sign up incomplete", "Please try again.");
      return false;
    }

    setIsVerifying(false);
    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) {
      Alert.alert("Sign up failed", getClerkErrorMessage(finalizeError));
      return false;
    }

    return true;
  };

  return (
    <>
      <AuthLayout
        title="Create your account"
        subtitle="Start your language journey today ✨"
        submitLabel="Sign Up"
        onSubmit={handleSignUp}
        isSubmitting={fetchStatus === "fetching"}
        footerPrompt="Already have an account?"
        footerLinkLabel="Log in"
        onFooterLinkPress={() => router.replace("/sign-in")}
        belowFields={<PasswordStrengthIndicator password={password} className="mt-[8px]" />}
      >
        <AuthTextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="alex@gmail.com"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
        />
        <AuthTextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          autoComplete="new-password"
          textContentType="newPassword"
          isPassword
        />
      </AuthLayout>

      {/* Mount point for Clerk's bot protection (only rendered on web; invisible) */}
      <View nativeID="clerk-captcha" />

      <VerificationCodeModal
        visible={isVerifying}
        email={email.trim()}
        onClose={() => setIsVerifying(false)}
        onComplete={handleVerify}
      />
    </>
  );
}
