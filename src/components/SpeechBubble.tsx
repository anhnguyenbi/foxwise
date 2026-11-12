import { Text, View } from "react-native";

type SpeechBubbleProps = {
  text: string;
  bgClassName: string; // e.g. "bg-[#EAF3FF]"
  textClassName: string; // e.g. "text-text-primary"
  tail: "left" | "right"; // bottom corner the little tail sits on
  className?: string; // position / rotation from the parent
};

export function SpeechBubble({
  text,
  bgClassName,
  textClassName,
  tail,
  className = "",
}: SpeechBubbleProps) {
  return (
    <View className={`speech-bubble ${bgClassName} ${className}`}>
      <Text className={`speech-bubble__text ${textClassName}`}>{text}</Text>
      <View
        className={`speech-bubble__tail speech-bubble__tail--${tail} ${bgClassName}`}
      />
    </View>
  );
}
