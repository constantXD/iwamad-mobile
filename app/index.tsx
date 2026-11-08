import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <Text style={styles.name}>Orazaly Kasymbek</Text>

      <Text style={styles.counter}>Likes: {likes}</Text>

      <Pressable
        onPress={() => setLikes(likes + 1)}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      {/* events button */}
      <Link href="/events" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Events</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    color: "#4b5563",
    marginBottom: 20,
  },
  counter: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  eventsButton: {
    backgroundColor: "#059669",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
