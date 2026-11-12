import { Text, TouchableOpacity, View } from "react-native";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
};

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="primary-button"
    >
      <Text className="primary-button__label">{label}</Text>
      <View className="primary-button__chevron" />
    </TouchableOpacity>
  );
}
