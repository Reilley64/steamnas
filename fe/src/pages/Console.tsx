import Flex from "../components/Flex";
import { Stomp } from "@stomp/stompjs";
import { For, createEffect, createSignal } from "solid-js";

function Console() {
  const [messages, setMessages] = createSignal<Array<string>>([]);

  createEffect(() => {
    const stompClient = Stomp.client("ws://192.168.0.91:10100/ws");

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/console", (message) => {
        setMessages((messages) => [...messages, message.body]);
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
      <pre style={{ display: "flex", "flex-direction": "column" }}>
        <span style={{ animation: "slow-blink 1.25s step-end infinite" }}>_</span>
        <For each={messages().reverse()}>{(message) => <span>{message}</span>}</For>
      </pre>
    </Flex>
  );
}

export default Console;
