import { useEffect, useState } from "react";
import { type ChatMessage, subscribeToChat } from "../lib/chat";

export type ChatStatus = "connecting" | "live" | "error";

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("connecting");

  useEffect(() => {
    setStatus("connecting");

    const unsubscribe = subscribeToChat(
      eventId,
      (list) => {
        setMessages(list);
        setStatus("live");
      },
      () => {
        setStatus("error");
      },
    );

    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}
