import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CameraView, useCameraPermissions} from "expo-camera";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../api";
import { X } from "lucide-react-native";
import { Logo } from "@/components/logo";
import { ResultCard } from "@/components/scanner/resultcard";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

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

  // Show result card if scanned
  if (scannedCode && customerData) {
    return (
      <ResultCard
        data={customerData}
        onClose={resetScanner}
        onLogVisit={handleLogVisit}
      />
    );
  }

  // Show camera if active
  if (isCameraActive && permission?.granted) {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
        {/* Stop button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.stopButton} onPress={stopScanning}>
            <X size={24} color="#fff" />
            <Text style={styles.stopButtonText}>Stop Scanning</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Default: Show scan button
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Logo size={120} />
        <Text style={styles.subtitle}>Scan the QR code at the carwash</Text>
        <TouchableOpacity style={styles.scanButton} onPress={startScanning}>
          <Text style={styles.scanButtonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none", // Allow touches to pass through to stop button
  },
  instructionText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 16,
    borderRadius: 12,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 300,
  },
  scanButton: {
    backgroundColor: "#228fc5",
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    marginTop: 24,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
});
