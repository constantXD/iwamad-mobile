import { Pressable, Text, StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from "react-native-reanimated";
import type { CampusEvent } from "../data/events";

type EventRowProps = {
  event: CampusEvent;
  isSaved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export function EventRow({
  event,
  isSaved,
  onPress,
  onToggleSaved,
}: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{isSaved ? "Unsave" : "Save"}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.row}>
            <Text style={styles.title}>{event.title}</Text>
            {isSaved && (
              <Animated.Text entering={ZoomIn} style={styles.savedBadge}>
                ★ Saved
              </Animated.Text>
            )}
          </View>
          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
  },
  cardPressed: {
    backgroundColor: "#f3f4f6",
    borderColor: "#9ca3af",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  savedBadge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d97706",
    marginLeft: 8,
  },
  meta: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  action: {
    minHeight: 44,
    marginVertical: 6,
    marginLeft: 8,
    paddingHorizontal: 20,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});
