import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import Input from "@/components/common/input";
import Button from "@/components/common/button";

export default function ForgotPasswordScreen() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({ email: "" });

  const validateForm = () => {
    const newErrors = { email: "" };

    if (!emailAddress) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return !newErrors.email;
  };

  const onResetPress = async () => {
    if (!isLoaded || !validateForm()) return;

    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      setSuccess(true);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We sent a password reset link to{"\n"}
            <Text style={styles.emailText}>{emailAddress}</Text>
          </Text>
        </View>

        {/* Success Message */}
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            Please check your email and follow the instructions to reset your
            password.
          </Text>

          <Button
            title="Back to Sign In"
            onPress={() => router.push("/(auth)/sign-in")}
            variant="primary"
          />

          <TouchableOpacity
            style={styles.resendContainer}
            onPress={onResetPress}
          >
            <Text style={styles.resendText}>
              Didn't receive the email?{" "}
              <Text style={styles.resendLink}>Resend</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive a password reset link
        </Text>
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

        <Button
          title={loading ? "Sending..." : "Send Reset Link"}
          onPress={onResetPress}
          loading={loading}
          disabled={loading || !emailAddress}
        />

        {/* Back to Sign In */}
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text style={styles.backText}>
            Back to <Text style={styles.backLink}>Sign In</Text>
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
    lineHeight: 22,
  },
  emailText: {
    fontWeight: "600",
    color: "#007AFF",
  },
  formContainer: {
    width: "100%",
  },
  successContainer: {
    width: "100%",
    alignItems: "center",
  },
  successText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  backContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  backText: {
    color: "#666",
    fontSize: 14,
  },
  backLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
  resendContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  resendText: {
    color: "#666",
    fontSize: 14,
  },
  resendLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
