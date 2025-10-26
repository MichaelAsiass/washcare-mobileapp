import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "large",
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [
      styles.button,
      styles[size],
      fullWidth && styles.fullWidth,
    ];

    if (variant === "primary") {
      return [...baseStyle, styles.primary, disabled && styles.primaryDisabled];
    } else if (variant === "secondary") {
      return [
        ...baseStyle,
        styles.secondary,
        disabled && styles.secondaryDisabled,
      ];
    } else {
      return [...baseStyle, styles.outline, disabled && styles.outlineDisabled];
    }
  };

  const getTextStyle = () => {
    if (variant === "primary") {
      return [styles.text, styles.primaryText, disabled && styles.textDisabled];
    } else if (variant === "secondary") {
      return [
        styles.text,
        styles.secondaryText,
        disabled && styles.textDisabled,
      ];
    } else {
      return [styles.text, styles.outlineText, disabled && styles.textDisabled];
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#fff" : "#228fc5"}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
     backgroundColor: "#228fc5",
    paddingVertical: 20,
    paddingHorizontal: 56,
    borderRadius: 16,
    shadowColor: "#228fc5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  small: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  medium: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    height: 56,
  },
  primary: {
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryDisabled: {
    backgroundColor: "#99c9ff",
    shadowOpacity: 0,
    elevation: 0,
  },
  secondary: {
    backgroundColor: "#6c757d",
  },
  secondaryDisabled: {
    backgroundColor: "#a0a5aa",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  outlineDisabled: {
    borderColor: "#99c9ff",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#fff",
  },
  outlineText: {
    color: "#007AFF",
  },
  textDisabled: {
    color: "#ccc",
  },
});
