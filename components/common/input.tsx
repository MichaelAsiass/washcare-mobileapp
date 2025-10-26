import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
  icon?: React.ReactNode;
};

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  autoCapitalize = "none",
  keyboardType = "default",
  error,
  icon,
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color="#666" />
            ) : (
              <Eye size={20} color="#666" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 56,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  inputContainerFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#fff",
  },
  inputContainerError: {
    borderColor: "#ff6b6b",
    backgroundColor: "#fff5f5",
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
