import Flex from "../components/Flex";
import { Stomp } from "@stomp/stompjs";
import { For, createEffect, createSignal } from "solid-js";
import Text from "../components/Text";

function Console() {
  const [messages, setMessages] = createSignal<Array<{ createdAt: string, message: string }>>([]);

  createEffect(() => {
    const stompClient = Stomp.client("ws://192.168.0.91:10100/ws");

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/console", (message) => {
        setMessages((prev) => [...prev, JSON.parse(message.body)]);
      });
    });

    return () => {
      stompClient.disconnect();
    };
  });

  return (
    <Flex
      sx={{ backgroundColor: "black", borderRadius: "10px", color: "white", fontSize: "0.875rem", padding: "1rem" }}
    >
      <Text as="pre" style={{ display: "flex", "flex-direction": "column" }}>
        <Text sx={{ animation: "slow-blink 1.25s step-end infinite" }}>_</Text>
        <For each={messages().sort((a, b) => b.createdAt.localeCompare(a.createdAt))}>
          {(message) => <Text>{`${message.createdAt}: ${message.message}`}</Text>}
        </For>
      </Text>
    </Flex>
  );
}

export default Console;
