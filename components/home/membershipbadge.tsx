import { View, Text, StyleSheet } from "react-native";

type MembershipBadgeProps = {
  isActive?: boolean;
  isPaused?: boolean;
  isExpired?: boolean;
  status: string;
};

export function MembershipBadge({
  isActive,
  isPaused,
  isExpired,
}: MembershipBadgeProps) {
  let badgeText = "INACTIVE";
  let badgeColor = "#ef4444";

  if (isActive) {
    badgeText = "ACTIVE MEMBER";
    badgeColor = "#22c55e";
  } else if (isPaused) {
    badgeText = "PAUSED";
    badgeColor = "#f59e0b";
  } else if (isExpired) {
    badgeText = "EXPIRED";
    badgeColor = "#ef4444";
  }

  return (
    <View style={[styles.badge, { backgroundColor: `${badgeColor}20` }]}>
      <Text style={[styles.badgeText, { color: badgeColor }]}>{badgeText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 2,
  },
  badgeText: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
