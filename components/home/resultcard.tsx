import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckCircle, XCircle, X } from "lucide-react-native";
import { MembershipBadge } from "./membershipbadge";

type ResultCardProps = {
  data: {
    valid: boolean;
    error?: string;
    customer?: {
      id: string;
      name: string;
      email: string;
      phone: string;
      licensePlate: string;
      totalVisits: number;
      lastVisitDate?: number;
    };
    membership?: {
      isActive: boolean;
      isExpired: boolean;
      isPaused: boolean;
      status: string;
      planName: string;
      nextBillingDate?: number;
      endDate?: number;
    };
  };
  onClose: () => void;
  onLogVisit: () => void;
};

export function ResultCard({ data, onClose, onLogVisit }: ResultCardProps) {
  const isActive = data.membership?.isActive;
  const isPaused = data.membership?.isPaused;
  const isExpired = data.membership?.isExpired;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          isActive ? styles.cardActive : styles.cardInactive,
        ]}
      >
        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color="#666" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Status Icon & Badge */}
          <View style={styles.statusSection}>
            {isActive ? (
              <CheckCircle size={80} color="#22c55e" strokeWidth={2.5} />
            ) : (
              <XCircle size={80} color="#ef4444" strokeWidth={2.5} />
            )}

            <MembershipBadge
              isActive={isActive}
              isPaused={isPaused}
              isExpired={isExpired}
              status={data.membership?.status || "none"}
            />
          </View>

          {/* Error message */}
          {!data.valid && (
            <View style={styles.errorSection}>
              <Text style={styles.errorText}>
                {data.error || "Invalid QR code"}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {isActive && data.customer && (
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={onLogVisit}
              >
                <Text style={styles.buttonTextPrimary}>Log Visit</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.buttonSecondary} onPress={onClose}>
              <Text style={styles.buttonTextSecondary}>Scan Another</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  card: {
    width: "100%",
    maxWidth: 450,
    maxHeight: "90%",
    borderRadius: 24,
    overflow: "hidden",
  },
  cardActive: {
    backgroundColor: "#f0fdf4",
  },
  cardInactive: {
    backgroundColor: "#fef2f2",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    padding: 30,
    alignItems: "center",
    gap: 24,
  },
  statusSection: {
    alignItems: "center",
    gap: 16,
  },
  errorSection: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: {
    fontSize: 16,
    color: "#dc2626",
    textAlign: "center",
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
    marginTop: 8,
  },
  buttonPrimary: {
    backgroundColor: "#22c55e",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#22c55e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonTextPrimary: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  buttonTextSecondary: {
    color: "#374151",
    fontSize: 18,
    fontWeight: "600",
  },
});
