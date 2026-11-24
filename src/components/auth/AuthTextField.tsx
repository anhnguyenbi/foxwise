import { useRef, useState, type ComponentRef } from "react";
import { Pressable, Text, TextInput, View, type TextInputProps } from "react-native";

import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { colors } from "@/theme";

type AuthTextFieldProps = TextInputProps & {
  label: string;
  // Hides the text and shows an eye button to reveal it
  isPassword?: boolean;
};

// A white card with a small label above the input, as used on the auth screens.
export function AuthTextField({ label, isPassword = false, ...inputProps }: AuthTextFieldProps) {
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const [isHidden, setIsHidden] = useState(isPassword);

  return (
    // Tapping anywhere on the card focuses the input
    <Pressable className="auth-field" onPress={() => inputRef.current?.focus()}>
      <View className="flex-1">
        <Text className="auth-field__label">{label}</Text>
        <TextInput
          ref={inputRef}
          className="auth-field__input"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isHidden}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
        />
      </View>

      {isPassword && (
        <Pressable
          className="ml-[12px]"
          hitSlop={12}
          onPress={() => setIsHidden((hidden) => !hidden)}
          accessibilityRole="button"
          accessibilityLabel={isHidden ? "Show password" : "Hide password"}
        >
          {isHidden ? <EyeIcon size={24} /> : <EyeOffIcon size={24} />}
        </Pressable>
      )}
    </Pressable>
  );
}
