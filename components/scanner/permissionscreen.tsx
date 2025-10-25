import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "lucide-react-native";

type PermissionScreenProps = {
  onRequest: () => void;
}

export function PermissionScreen({ onRequest }: PermissionScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Camera size={64} color="#6b7280" />
        </View>
        
        <Text style={styles.title}>Camera Access Required</Text>
        
        <Text style={styles.description}>
          We need access to your camera to scan QR codes for member check-ins.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onRequest}>
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 20,
    maxWidth: 400,
  },
  iconContainer: {
    backgroundColor: "#f3f4f6",
    padding: 24,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});