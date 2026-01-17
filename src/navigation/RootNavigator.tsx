import React from "react";
import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";

export function RootNavigator({ isAuthed }: { isAuthed: boolean }) {
  return isAuthed ? <AppNavigator /> : <AuthNavigator />;
}
