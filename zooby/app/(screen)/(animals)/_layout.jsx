// app/(screen)/(animals)/_layout.jsx

import { Stack } from 'expo-router';

export default function AnimalsLayout() {
  return (
    <Stack >
      <Stack.Screen name='animalsafari' />
      </Stack>
  );
}
