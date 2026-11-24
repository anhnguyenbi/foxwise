import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthTextField } from "@/components/auth/AuthTextField";
import { VerificationCodeModal } from "@/components/auth/VerificationCodeModal";
import { getClerkErrorMessage } from "@/lib/clerk";

export default function SignIn() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Step 1: start the sign-in and email a 6-digit code (passwordless)
  const handleSignIn = async () => {
    const { error } = await signIn.emailCode.sendCode({ emailAddress: email.trim() });
    if (error) {
      Alert.alert("Sign in failed", getClerkErrorMessage(error));
      return;
    }

    setIsVerifying(true);
  };

  // Step 2: check the code, then activate the session.
  // The root layout's auth guard then shows the home screen.
  const handleVerify = async (code: string) => {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) {
      Alert.alert("Invalid code", getClerkErrorMessage(error));
      return false;
    }

    if (signIn.status !== "complete") {
      // e.g. the account has two-factor authentication turned on, which this app doesn't support yet
      Alert.alert("Sign in incomplete", "This account needs an extra verification step that isn't supported yet.");
      return false;
    }

    setIsVerifying(false);
    const { error: finalizeError } = await signIn.finalize();
    if (finalizeError) {
      Alert.alert("Sign in failed", getClerkErrorMessage(finalizeError));
      return false;
    }

    return true;
  };

  return (
    <>
      <AuthLayout
        title="Welcome back"
        subtitle="Continue your language journey ✨"
        submitLabel="Sign In"
        onSubmit={handleSignIn}
        isSubmitting={fetchStatus === "fetching"}
        footerPrompt="Don't have an account?"
        footerLinkLabel="Sign up"
        onFooterLinkPress={() => router.replace("/sign-up")}
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
      </AuthLayout>

      <VerificationCodeModal
        visible={isVerifying}
        email={email.trim()}
        onClose={() => setIsVerifying(false)}
        onComplete={handleVerify}
      />
    </>
  );
}
