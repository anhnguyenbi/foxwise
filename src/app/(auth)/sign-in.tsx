import { useRouter } from "expo-router";
import { useState } from "react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthTextField } from "@/components/auth/AuthTextField";
import { VerificationCodeModal } from "@/components/auth/VerificationCodeModal";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock flow for now: pretend a code was emailed and ask for it
  const handleSignIn = () => setIsVerifying(true);

  const handleVerified = () => {
    setIsVerifying(false);
    router.dismissTo("/");
  };

  return (
    <>
      <AuthLayout
        title="Welcome back"
        subtitle="Continue your language journey ✨"
        submitLabel="Sign In"
        onSubmit={handleSignIn}
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
        onComplete={handleVerified}
      />
    </>
  );
}
