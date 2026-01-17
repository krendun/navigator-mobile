import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "../navigation/RootNavigator";
import { clearTokens, getTokens } from "./tokenStore";

/**
 * Replace validateSession() with your real auth provider check.
 * For Supabase: you typically call supabase.auth.setSession(...) or supabase.auth.getUser()
 * For a custom backend: call /me with the access token.
 */
async function validateSession(accessToken: string): Promise<boolean> {
  // MVP stub: treat any non-empty token as valid
  // Replace this with a real request to your auth provider/back-end.
  return accessToken.length > 0;
}

export function AuthGate() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { accessToken } = await getTokens();

        if (!accessToken) {
          setIsAuthed(false);
          return;
        }

        const ok = await validateSession(accessToken);
        if (!ok) {
          await clearTokens();
          setIsAuthed(false);
          return;
        }

        setIsAuthed(true);
      } catch {
        // If anything goes wrong, fall back to logged-out.
        await clearTokens();
        setIsAuthed(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator isAuthed={isAuthed} />
    </NavigationContainer>
  );
}
