import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CircleUserRound, House } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          title: "Account",
          tabBarIcon: ({ color }) => (
            <CircleUserRound size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
