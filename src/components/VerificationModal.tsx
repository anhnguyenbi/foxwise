import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { images } from "@/constants/images";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerified: () => void;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  onVerified,
}: VerificationModalProps) {
  const [code, setCode] = useState("");

  const handleClose = () => {
    setCode("");
    onClose();
  };

  const handleChange = (text: string) => {
    // Keep digits only, max 6
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    // Last digit entered -> done
    if (digits.length === CODE_LENGTH) {
      setCode("");
      onVerified();
    }
  };

  const activeIndex = Math.min(code.length, CODE_LENGTH - 1);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      {/* Keeps the popup centered in the space above the keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Pressable
          onPress={handleClose}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(13, 19, 43, 0.45)",
          }}
        />

        <View
          className="code-popup"
          style={{ width: "85%", maxWidth: 360, alignSelf: "center" }}
        >
          <Image source={images.iconMail} className="code-popup__icon" />
          <Text className="code-popup__title">Check your email</Text>
          <Text className="code-popup__text">
            We sent a verification email to{" "}
            <Text className="font-poppins-medium text-text-primary">
              {email || "your inbox"}
            </Text>
            . Enter the 6-digit code to continue.
          </Text>

          <View className="mt-6 self-stretch">
            <View className="flex-row gap-2">
              {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                <View
                  key={index}
                  className={`code-box ${index === activeIndex ? "code-box--active" : ""}`}
                >
                  <Text className="code-box__digit">{code[index] ?? ""}</Text>
                </View>
              ))}
            </View>

            {/* Invisible input on top of the boxes: opens the number pad and receives the digits */}
            <TextInput
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              maxLength={CODE_LENGTH}
              autoFocus
              caretHidden
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                opacity: 0,
              }}
            />
          </View>

          <Text className="code-popup__resend">
            Didn&apos;t get the code?{" "}
            <Text className="code-popup__link">Resend</Text>
          </Text>
          <Text className="code-popup__link mt-3" onPress={handleClose}>
            Cancel
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
