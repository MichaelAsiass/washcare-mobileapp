import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/api";
import { X, Sparkles, Zap } from "lucide-react-native";
import { Logo } from "@/components/logo";
import { ResultCard } from "@/components/home/resultcard";
import { useEffect, useRef } from "react";
import { Greeting } from "@/components/home/greetings";
import Button from "@/components/common/button";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const customerData = useQuery(
    api.customer.validateQRCode,
    scannedCode ? { qrCode: scannedCode } : "skip"
  );

  const logVisit = useMutation(api.customer.logBayVisit);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScannedCode(data);
    setIsCameraActive(false);
  };

  const handleLogVisit = async () => {
    if (!customerData?.valid || !customerData.customer) return;

    try {
      await logVisit({
        customerId: customerData.customer.id as any,
        businessId: "YOUR_BUSINESS_ID" as any,
        bayNumber: undefined,
        wasActive: customerData.membership?.isActive || false,
      });

      Alert.alert("Success", "Visit logged!");
      resetScanner();
    } catch (error) {
      Alert.alert("Error", "Failed to log visit");
    }
  };

  const resetScanner = () => {
    setScannedCode(null);
  };

  const startScanning = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }
    setIsCameraActive(true);
  };

  const stopScanning = () => {
    setIsCameraActive(false);
  };

  if (scannedCode && customerData) {
    return (
      <ResultCard
        data={customerData}
        onClose={resetScanner}
        onLogVisit={handleLogVisit}
      />
    );
  }

  if (isCameraActive && permission?.granted) {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
        <View style={styles.scanOverlay}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <Text style={styles.scanInstruction}>Position QR code in frame</Text>
        </View>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.stopButton} onPress={stopScanning}>
            <X size={24} color="#fff" />
            <Text style={styles.stopButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Greeting />
      <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
        {/* Decorative background elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Logo size={120} />
        </Animated.View>

        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>
            Scan your QR code to access the car wash
          </Text>
        </View>

        {/* Feature highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Zap size={20} color="#228fc5" />
            <Text style={styles.featureText}>Instant access</Text>
          </View>
          <View style={styles.feature}>
            <Sparkles size={20} color="#228fc5" />
            <Text style={styles.featureText}>No coins needed</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={startScanning}
          activeOpacity={0.8}
        >
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#22c55e",
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  scanInstruction: {
    marginTop: 24,
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#228fc5",
    opacity: 0.05,
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "#228fc5",
    opacity: 0.05,
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
    marginTop: 32,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 32,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
  },
  scanButton: {
    backgroundColor: "#228fc5",
    paddingVertical: 20,
    paddingHorizontal: 56,
    borderRadius: 16,
    shadowColor: "#228fc5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
  },
  stopButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  stopButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
});
