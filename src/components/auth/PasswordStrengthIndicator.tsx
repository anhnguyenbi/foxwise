import { Text, View } from "react-native";

export type PasswordStrength = "weak" | "medium" | "strong";

const STRONG_MIN_LENGTH = 10;

// How many character types the password uses: lowercase, uppercase, number, symbol
function countCharacterTypes(password: string) {
  return [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((pattern) => pattern.test(password)).length;
}

// Rates a password by its length and how many character types it uses.
// Visual hint only: Clerk does the real validation.
export function getPasswordStrength(password: string): PasswordStrength {
  const characterTypes = countCharacterTypes(password);

  if (password.length >= STRONG_MIN_LENGTH && characterTypes >= 3) return "strong";
  if (password.length >= 8 && characterTypes >= 2) return "medium";
  return "weak";
}

// Full class names (not built from strings) so Tailwind can find them
const LEVELS = {
  weak: { label: "Weak", filledSegments: 1, barClass: "bg-error", textClass: "text-error-dark" },
  medium: { label: "Medium", filledSegments: 2, barClass: "bg-warning", textClass: "text-warning-dark" },
  strong: { label: "Strong", filledSegments: 3, barClass: "bg-success", textClass: "text-success-dark" },
};

type PasswordStrengthIndicatorProps = {
  password: string;
  // Spacing from the parent, e.g. "mt-[8px]"
  className?: string;
};

// One compact row: a 3-segment bar with the level label on the right.
// Always takes its height, so nothing moves when the user starts typing.
export function PasswordStrengthIndicator({ password, className = "" }: PasswordStrengthIndicatorProps) {
  const level = LEVELS[getPasswordStrength(password)];

  return (
    <View className={`h-[20px] ${className}`}>
      {password.length > 0 && (
        <View
          className="flex-1 flex-row items-center"
          accessible
          accessibilityLabel={`Password strength: ${level.label}`}
        >
          {/* The bar takes the remaining width */}
          <View className="flex-1 flex-row gap-[6px]">
            {[1, 2, 3].map((segment) => (
              <View
                key={segment}
                className={`h-[4px] flex-1 rounded-full ${segment <= level.filledSegments ? level.barClass : "bg-border"}`}
              />
            ))}
          </View>

          {/* Sized to its text. Poppins needs ~19.5px of line height at 13px, so a 20px line keeps
              descenders (the "g" in "Strong") from being clipped. */}
          <Text className={`ml-[10px] font-poppins-semibold text-[13px] leading-[20px] ${level.textClass}`}>
            {level.label}
          </Text>
        </View>
      )}
    </View>
  );
}
