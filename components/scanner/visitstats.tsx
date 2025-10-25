import { View, Text, StyleSheet } from "react-native";
import { TrendingUp, Calendar } from "lucide-react-native";

type VisitStatsProps = {
  totalVisits: number;
  lastVisitDate?: number;
  nextBillingDate?: number;
};

export function VisitStats({
  totalVisits,
  lastVisitDate,
  nextBillingDate,
}: VisitStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statRow}>
        <TrendingUp size={18} color="#6b7280" />
        <Text style={styles.statLabel}>Total Visits:</Text>
        <Text style={styles.statValue}>{totalVisits}</Text>
      </View>

      {lastVisitDate && (
        <View style={styles.statRow}>
          <Calendar size={18} color="#6b7280" />
          <Text style={styles.statLabel}>Last Visit:</Text>
          <Text style={styles.statValue}>
            {new Date(lastVisitDate).toLocaleDateString()}
          </Text>
        </View>
      )}

      {nextBillingDate && (
        <View style={styles.statRow}>
          <Calendar size={18} color="#6b7280" />
          <Text style={styles.statLabel}>Next Billing:</Text>
          <Text style={styles.statValue}>
            {new Date(nextBillingDate).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 10,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#6b7280",
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
});
