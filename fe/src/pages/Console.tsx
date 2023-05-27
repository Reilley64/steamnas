import Flex from "../components/Flex";
import {For, createSignal, createEffect} from "solid-js";

function Console() {
  const [messages, setMessages] = createSignal<Array<string>>([]);

  createEffect(() => {
    const socket = new WebSocket("ws://192.168.0.91:10100/ws");
    socket.onmessage = (event) => setMessages((prev) => [...prev, event.data]);

    return () => {
      socket.close();
    }
  });

  return (
    <Flex
      sx={{ backgroundColor: "black", borderRadius: "10px", color: "white", "font-size": "0.875rem", padding: "1rem" }}
    >
      <pre style={{ display: "flex", "flex-direction": "column" }}>
        <For each={messages().reverse()}>{(message) => <span>{message}</span>}</For>
      </pre>
    </Flex>
  );
}

export default Console;
