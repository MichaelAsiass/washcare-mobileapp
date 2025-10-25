import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../api";
import { Button } from "react-native";
import { ResultCard } from "@/components/resultcard";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  // Query to validate QR code
  const customerData = useQuery(
    api.customer.validateQRCode,
    scannedCode ? { qrCode: scannedCode } : "skip"
  );

  // Mutation to log visit
  const logVisit = useMutation(api.customer.logBayVisit);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (!isScanning) return;
    
    setIsScanning(false);
    setScannedCode(data);

    // Vibrate on scan
    // Vibration.vibrate(100);
  };

  const handleLogVisit = async () => {
    if (!customerData?.valid || !customerData.customer) return;

    try {
      await logVisit({
        customerId: customerData.customer.id as any,
        businessId: "YOUR_BUSINESS_ID" as any, // TODO: Get from settings
        bayNumber: undefined,
        wasActive: customerData.membership.isActive,
      });

      Alert.alert("Success", "Visit logged successfully!");
      resetScanner();
    } catch (error) {
      Alert.alert("Error", "Failed to log visit");
    }
  };

  const resetScanner = () => {
    setScannedCode(null);
    setIsScanning(true);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scannedCode && customerData ? (
        <ResultCard
          data={customerData}
          onClose={resetScanner}
          onLogVisit={handleLogVisit}
        />
      ) : (
        <>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
  },
  instruction: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});