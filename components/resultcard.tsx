import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckCircle, XCircle, User, Car, Calendar } from "lucide-react-native";

type ResultCardProps = {
  data: {
    valid: boolean;
    customer?: {
      firstName: string;
      lastName: string;
      email: string;
      licensePlate: string;
      totalVisits: number;
      lastVisitDate?: number;
    };
    membership?: {
      isActive: boolean;
      isExpired: boolean;
      planName: string;
      status: string;
    };
    error?: string;
  };
  onClose: () => void;
  onLogVisit: () => void;
}

export function ResultCard({ data, onClose, onLogVisit }: ResultCardProps) {
  const isActive = data.membership?.isActive;

  return (
    <View style={styles.container}>
      <View style={[styles.card, isActive ? styles.cardActive : styles.cardInactive]}>
        {/* Status Icon */}
        <View style={styles.iconContainer}>
          {isActive ? (
            <CheckCircle size={80} color="#22c55e" />
          ) : (
            <XCircle size={80} color="#ef4444" />
          )}
        </View>

        {/* Status Text */}
        <Text style={[styles.status, isActive ? styles.statusActive : styles.statusInactive]}>
          {isActive ? "ACTIVE MEMBER" : data.error || "INACTIVE"}
        </Text>

        {data.customer && (
          <>
            {/* Customer Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <User size={20} color="#666" />
                <Text style={styles.infoText}>
                  {data.customer.firstName} {data.customer.lastName}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Car size={20} color="#666" />
                <Text style={styles.infoText}>{data.customer.licensePlate}</Text>
              </View>

              {data.membership && (
                <View style={styles.infoRow}>
                  <Calendar size={20} color="#666" />
                  <Text style={styles.infoText}>{data.membership.planName}</Text>
                </View>
              )}

              <View style={styles.statsContainer}>
                <Text style={styles.statsText}>
                  Total Visits: {data.customer.totalVisits}
                </Text>
                {data.customer.lastVisitDate && (
                  <Text style={styles.statsText}>
                    Last Visit: {new Date(data.customer.lastVisitDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              {isActive && (
                <TouchableOpacity style={styles.buttonPrimary} onPress={onLogVisit}>
                  <Text style={styles.buttonTextPrimary}>Log Visit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.buttonSecondary} onPress={onClose}>
                <Text style={styles.buttonTextSecondary}>Scan Another</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  cardActive: {
    backgroundColor: "#f0fdf4",
  },
  cardInactive: {
    backgroundColor: "#fef2f2",
  },
  iconContainer: {
    marginBottom: 20,
  },
  status: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  statusActive: {
    color: "#22c55e",
  },
  statusInactive: {
    color: "#ef4444",
  },
  infoContainer: {
    width: "100%",
    gap: 15,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: 18,
    color: "#333",
  },
  statsContainer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    gap: 5,
  },
  statsText: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
  },
  buttonPrimary: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonTextPrimary: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  buttonTextSecondary: {
    color: "#333",
    fontSize: 18,
    fontWeight: "600",
  },
});