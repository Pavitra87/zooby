import { Stack } from "expo-router";
import { AuthProvider } from "../../context/AuthContext";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        {/* <Stack.Screen name="logout" options={{ headerShown: false }} /> */}
      </Stack>
    </AuthProvider>
  );
}
