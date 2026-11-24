import { useRouter } from "expo-router";
import { useState } from "react";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthTextField } from "@/components/auth/AuthTextField";
import { VerificationCodeModal } from "@/components/auth/VerificationCodeModal";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock flow for now: pretend a code was emailed and ask for it
  const handleSignUp = () => setIsVerifying(true);

  const handleVerified = () => {
    setIsVerifying(false);
    router.dismissTo("/");
  };

  return (
    <>
      <AuthLayout
        title="Create your account"
        subtitle="Start your language journey today ✨"
        submitLabel="Sign Up"
        onSubmit={handleSignUp}
        footerPrompt="Already have an account?"
        footerLinkLabel="Log in"
        onFooterLinkPress={() => router.replace("/sign-in")}
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

      <VerificationCodeModal
        visible={isVerifying}
        email={email.trim()}
        onClose={() => setIsVerifying(false)}
        onComplete={handleVerified}
      />
    </>
  );
}
