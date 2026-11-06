import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#000000",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="events/index" options={{ title: "Events" }} />
        <Stack.Screen name="events/[id]" options={{ title: "Event Details" }} />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </QueryClientProvider>
  );
}
