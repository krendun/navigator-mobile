import React from "react";
import { AuthProvider } from "./src/auth/AuthContext";
import { AuthGate } from "./src/auth/AuthGate";

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
