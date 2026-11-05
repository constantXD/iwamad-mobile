import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { events } from "../../src/data/events";

export default function EventsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // Switch between saved and not saved
  const toggleSaved = (id: number) => {
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [...ids, id],
    );
  };

  // Filter events based on the search query
  const shown = events.filter((e) => {
    const text = query.trim().toLowerCase();
    return (
      e.title.toLowerCase().includes(text) ||
      e.place.toLowerCase().includes(text)
    );
  });

  return (
    <View style={styles.container}>
      {/* Search field */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search events..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      {/* Required hint above the list with a counter */}
      <Text style={styles.hintText}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      {/* Events list */}
      <FlatList
        data={shown}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => {
          const isSaved = savedIds.includes(item.id);

          return (
            <Pressable
              onPress={() => router.push(`/events/${item.id}`)}
              onLongPress={() => toggleSaved(item.id)}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>
                  {item.date} · {item.place}
                </Text>
              </View>

              {isSaved && <Text style={styles.savedBadge}>★ Saved</Text>}
            </Pressable>
          );
        }}
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
    backgroundColor: "#ffffff",
  },
  searchInput: {
    height: 48,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  hintText: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 14,
    color: "#4b5563",
  },
  card: {
    minHeight: 44, // Requirement for accessibility touch target
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  cardPressed: {
    backgroundColor: "#f3f4f6", // Visual feedback on press
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  cardMeta: {
    fontSize: 14,
    color: "#6b7280",
  },
  savedBadge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d97706",
    marginLeft: 12,
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
