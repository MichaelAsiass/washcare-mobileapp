import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Mail, Lock } from "lucide-react-native";
import Input from "@/components/common/input";
import Button from "@/components/common/button";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Add your logo - update the path as needed
  const logo = require("@/assets/images/logo.png");

  const validateForm = () => {
    const newErrors = { email: "", password: "" };

    if (!emailAddress) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const onSignInPress = async () => {
    if (!isLoaded || !validateForm()) return;

    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", "Sign in failed. Please try again.");
      }
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.errors?.[0]?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          icon={<Mail size={20} color="#666" />}
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
          icon={<Lock size={20} color="#666" />}
        />

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => router.push("/(auth)/forgotpassword")}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <Button
          title={loading ? "Signing In..." : "Sign In"}
          onPress={onSignInPress}
          loading={loading}
          disabled={loading || !emailAddress || !password}
        />

        {/* Sign Up Link */}
        <TouchableOpacity
          style={styles.signUpContainer}
          onPress={() => router.push("/(auth)/sign-up")}
        >
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: "contain",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  signUpContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#666",
    fontSize: 14,
  },
  signUpLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
