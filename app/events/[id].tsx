import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useEvents } from "../../src/hooks/useEvents";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.stateText}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.stateText}>Could not load events</Text>
        <Text style={styles.errorSubText}>{error?.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data?.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
        <Text style={styles.detail}>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.detail}>
        {event.date} · {event.place}
      </Text>
      <Text style={styles.seats}>{event.seats} seats available</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  stateText: { fontSize: 18, fontWeight: "bold", marginVertical: 8 },
  errorSubText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    minHeight: 44,
    minWidth: 120,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  detail: { fontSize: 16, color: "#444", marginBottom: 8 },
  seats: { fontSize: 14, color: "#666", marginTop: 4 },
});
