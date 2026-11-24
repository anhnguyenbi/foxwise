import { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View } from "react-native";

import { CloseIcon, MailIcon } from "@/components/icons";

const CODE_LENGTH = 6;

type VerificationCodeModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  // Called once all 6 digits are entered
  onComplete: (code: string) => void;
};

// Bottom sheet that asks for the 6-digit code sent by email. It sits right above the keyboard.
export function VerificationCodeModal({ visible, email, onClose, onComplete }: VerificationCodeModalProps) {
  const [code, setCode] = useState("");

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    if (digits.length === CODE_LENGTH) onComplete(digits);
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "flex-end" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Dimmed backdrop */}
        <View className="absolute inset-0 bg-black/40" />

        <View className="rounded-t-[32px] bg-white px-6 pb-8 pt-6">
          <Pressable
            className="self-end"
            hitSlop={12}
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <CloseIcon size={24} />
          </Pressable>

          <View className="h-16 w-16 items-center justify-center self-center rounded-full bg-[#F1F0FF]">
            <MailIcon size={32} />
          </View>

          <Text className="mt-4 text-center font-poppins-bold text-[24px] leading-[32px] text-text-primary">
            Check your email
          </Text>
          <Text className="mt-2 text-center font-poppins text-[15px] leading-[23px] text-text-secondary">
            We sent a verification code to{" "}
            <Text className="font-poppins-medium text-text-primary">{email || "your email"}</Text>. Enter the
            6-digit code below.
          </Text>

          {/* Code boxes. A transparent input on top captures the typing. */}
          <View className="relative mt-6 flex-row gap-2.5">
            {Array.from({ length: CODE_LENGTH }, (_, index) => {
              const isActive = index === code.length;
              const isFilled = index < code.length;
              const stateClass = isActive
                ? "border-lingua-deep-purple bg-white"
                : isFilled
                  ? "border-[#C9BFFC] bg-white"
                  : "border-border bg-surface";

              return (
                <View key={index} className={`otp-box ${stateClass}`}>
                  <Text className="otp-box__digit">{code[index] ?? ""}</Text>
                </View>
              );
            })}

            <TextInput
              className="absolute inset-0 opacity-0"
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              caretHidden
              autoFocus
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
