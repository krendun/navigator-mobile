import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { useAuth } from "../auth/AuthContext";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

export function SignupScreen({ navigation }: Props) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Create account</Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Password (min 6 chars)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <Button
        title={busy ? "Creating..." : "Sign up"}
        disabled={busy}
        onPress={async () => {
          try {
            setBusy(true);
            await signUp(email.trim(), password);
            Alert.alert(
              "Check your email",
              "If email confirmation is enabled, confirm your email, then return to log in."
            );
            navigation.navigate("Login");
          } catch (e: any) {
            Alert.alert("Signup failed", e?.message ?? "Please try again.");
          } finally {
            setBusy(false);
          }
        }}
      />

      <Button title="Back to login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
