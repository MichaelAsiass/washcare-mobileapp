import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

      return <Redirect href="/(tabs)" />;

//   if (isSignedIn) {
//     return <Redirect href="/(tabs)" />;
//   } else {
//     return <Redirect href="/(auth)/sign-in" />;
//   }
}

