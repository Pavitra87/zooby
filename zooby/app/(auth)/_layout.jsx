import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      {/* <Stack.Screen name="logout" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
