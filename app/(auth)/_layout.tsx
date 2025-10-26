import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
