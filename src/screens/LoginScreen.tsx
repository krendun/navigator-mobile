import React from "react";
import { View, Button, Text } from "react-native";
import { setTokens } from "../auth/tokenStore";

export function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text>Login</Text>
      <Button
        title="Fake Login (store tokens)"
        onPress={async () => {
          await setTokens("fake_access_token", "fake_refresh_token");
          // App restart is the simplest way to re-trigger AuthGate in this stub.
          // Once we wire real auth, we will use state/context to update immediately.
        }}
      />
    </View>
  );
}
