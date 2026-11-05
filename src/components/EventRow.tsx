import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

export interface EventItem {
  id: number | string;
  title: string;
  date: string;
  place: string;
  description?: string;
}

interface EventRowProps {
  event: EventItem;
  onPress: () => void;
  onLongPress: () => void;
  isSaved?: boolean;
}

export const EventRow: React.FC<EventRowProps> = ({
  event,
  onPress,
  onLongPress,
  isSaved,
}) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>
          {event.date} · {event.place}
        </Text>
      </View>
      {isSaved && <Text style={styles.savedBadge}>★ Saved</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowPressed: {
    backgroundColor: "#f0f0f0",
    opacity: 0.7,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: "#666",
  },
  savedBadge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d97706",
    marginLeft: 8,
  },
});
