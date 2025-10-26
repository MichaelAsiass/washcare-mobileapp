import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Mail, Lock, User } from "lucide-react-native";
import Input from "@/components/common/input";
import Button from "@/components/common/button";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    code: "",
  });

  // Add your logo - same as sign-in
  const logo = require("@/assets/images/logo.png");

  const validateSignUpForm = () => {
    const newErrors = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      code: "",
    };

    if (!firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!emailAddress) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return (
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.firstName &&
      !newErrors.lastName
    );
  };

  const validateVerificationForm = () => {
    const newErrors = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      code: "",
    };

    if (!code) {
      newErrors.code = "Verification code is required";
    } else if (code.length < 6) {
      newErrors.code = "Code must be 6 digits";
    }

    setErrors(newErrors);
    return !newErrors.code;
  };

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded || !validateSignUpForm()) return;

    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded || !validateVerificationForm()) return;

    setLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", "Verification failed. Please try again.");
      }
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.errors?.[0]?.message ||
          "Invalid verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We sent a verification code to{"\n"}
            <Text style={styles.emailText}>{emailAddress}</Text>
          </Text>
        </View>

        {/* Verification Form */}
        <View style={styles.formContainer}>
          <Input
            placeholder="Enter verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            error={errors.code}
            icon={<Lock size={20} color="#666" />}
          />

          <Button
            title={loading ? "Verifying..." : "Verify Email"}
            onPress={onVerifyPress}
            loading={loading}
            disabled={loading || !code}
          />

          <TouchableOpacity
            style={styles.backToSignIn}
            onPress={() => setPendingVerification(false)}
          >
            <Text style={styles.backToSignInText}>Back to sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <View style={styles.nameContainer}>
          <View style={styles.nameInput}>
            <Input
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              error={errors.firstName}
              icon={<User size={20} color="#666" />}
            />
          </View>
          <View style={styles.nameSpacer} />
          <View style={styles.nameInput}>
            <Input
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              error={errors.lastName}
              icon={<User size={20} color="#666" />}
            />
          </View>
        </View>

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

        <Button
          title={loading ? "Creating Account..." : "Create Account"}
          onPress={onSignUpPress}
          loading={loading}
          disabled={
            loading || !emailAddress || !password || !firstName || !lastName
          }
        />

        {/* Sign In Link */}
        <TouchableOpacity
          style={styles.signInContainer}
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Text style={styles.signInLink}>Sign In</Text>
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
  emailText: {
    fontWeight: "600",
    color: "#007AFF",
  },
  formContainer: {
    width: "100%",
  },
  nameContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  nameInput: {
    flex: 1,
  },
  nameSpacer: {
    width: 12,
  },
  backToSignIn: {
    alignItems: "center",
    marginTop: 20,
  },
  backToSignInText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  signInContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  signInText: {
    color: "#666",
    fontSize: 14,
  },
  signInLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
