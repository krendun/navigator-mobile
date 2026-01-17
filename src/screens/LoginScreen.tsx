import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import { useAuth } from "../auth/AuthContext";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Log in</Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <Button
        title={busy ? "Logging in..." : "Log in"}
        disabled={busy}
        onPress={async () => {
          try {
            setBusy(true);
            await signIn(email.trim(), password);
            // No navigation needed: AuthContext switches to App stack automatically.
          } catch (e: any) {
            Alert.alert("Login failed", e?.message ?? "Please try again.");
          } finally {
            setBusy(false);
          }
        }}
      />

      <Button title="Create an account" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
}
