import React from "react";
import { View, Text, Button } from "react-native";
import { clearTokens } from "../auth/tokenStore";

export function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text>Home (Map will go here)</Text>
      <Button
        title="Reset Auth (clear tokens)"
        onPress={async () => {
          await clearTokens();
        }}
      />
      <Text style={{ opacity: 0.6 }}>After clearing, reload the app.</Text>
    </View>
  );
}
