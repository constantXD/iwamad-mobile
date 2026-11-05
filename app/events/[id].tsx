import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Link, Stack } from "expo-router";
import { events } from "../../src/data/events";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Find the event with the given id from the events data
  const event = events.find((e) => e.id === Number(id));

  // If the event is not found, display an error message and a link back to the events list
  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Event not found</Text>
        <Text style={styles.errorSub}>No event with id {id}.</Text>
        <Link href="/events" style={styles.backLink}>
          Back to events
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* dynamic title in header */}
      <Stack.Screen options={{ title: event.title }} />

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.date} · {event.place}
      </Text>
      <Text style={styles.seats}>{event.seats} seats available</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  meta: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 8,
  },
  seats: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1d4ed8",
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 8,
  },
  errorSub: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 16,
  },
  backLink: {
    fontSize: 16,
    color: "#2563eb",
    textDecorationLine: "underline",
  },
});
