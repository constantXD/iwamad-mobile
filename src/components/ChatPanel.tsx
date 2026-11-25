import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useChat } from "../hooks/useChat";
import { sendMessage } from "../lib/chat";
import { askNotificationPermission } from "../lib/notifications";

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState("");

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const trimmed = text.trim();
  const isDisabled = trimmed.length === 0;

  const handleSend = () => {
    if (isDisabled) return;
    sendMessage(eventId, trimmed);
    setText("");
  };

  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Write a message"
          maxLength={200}
        />
        <Pressable
          style={[styles.button, isDisabled && styles.buttonDisabled]}
          onPress={handleSend}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
      </View>

      {status === "connecting" && (
        <Text style={styles.statusText}>Connecting</Text>
      )}
      {status === "error" && (
        <Text style={styles.statusText}>Chat unavailable</Text>
      )}
      {status === "live" && messages.length === 0 && (
        <Text style={styles.statusText}>No messages yet</Text>
      )}

      {newestFirst.map((m) => (
        <View key={m.id} style={styles.messageRow}>
          <Text style={styles.messageText}>
            <Text style={styles.author}>{m.author}: </Text>
            {m.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  statusText: {
    color: "#6b7280",
    fontStyle: "italic",
  },
  messageRow: {
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },
  messageText: {
    fontSize: 15,
  },
  author: {
    fontWeight: "600",
  },
});
