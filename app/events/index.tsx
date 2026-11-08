import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { events } from "../../src/data/events";
import { EventRow } from "../../src/components/EventRow";

export default function EventsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // Вычисляется на лету, строго по title, без второго useState
  const shown = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()),
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
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        returnKeyType="search"
      />

      <Text style={styles.hintText}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <FlatList
        data={shown}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            isSaved={savedIds.includes(Number(item.id))}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSave(Number(item.id))}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events match</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
    fontSize: 16,
  },
  hintText: {
    fontSize: 14,
    color: "#6b7280",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
  },
});
