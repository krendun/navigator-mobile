import React from "react";
import { Button, Text, View } from "react-native";
import { useAuth } from "../auth/AuthContext";

export function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text>Welcome, {user?.email}</Text>
      <Button title="Log out" onPress={signOut} />
    </View>
  );
}
