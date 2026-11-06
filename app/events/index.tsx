import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { useEvents } from "../../src/hooks/useEvents";
import { EventRow } from "../../src/components/EventRow";
import { router } from "expo-router";

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } =
    useEvents();
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([]);

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

  const events = data ?? [];
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />
      {savedIds.length > 0 && (
        <Text style={styles.savedCounter}>Saved: {savedIds.length}</Text>
      )}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => String(item.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSave(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events match</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
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
  searchInput: {
    height: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  savedCounter: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    color: "#888",
  },
});
