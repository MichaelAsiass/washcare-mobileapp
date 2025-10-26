import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../api";

export function Greeting() {
  // const user = useQuery(api.users.getCurrentUser, {});

  return (
    <View style={[styles.container, styles.greetingContainer]}>
      <Text style={styles.greeting}>Hi Guest!</Text>
      <Text style={styles.welcomeMessage}>Welcome back!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 32,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },
  welcomeMessage: {
    fontSize: 18,
    color: "#6b7280",
    marginTop: 4,
  },
  greetingContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
});
