import {createSignal, For} from "solid-js";
import { createWS } from '@solid-primitives/websocket';
import Flex from "../components/Flex";

function Console() {
  const [messages, setMessages] = createSignal<Array<string>>([]);

  const ws = createWS("ws://localhost:8080/ws");

  ws.onmessage = (event) => setMessages((prev) => [...prev, event.data]);

  return (
    <Flex sx={{ backgroundColor: "black", borderRadius: "10px", color: "white", "font-size": "0.875rem", padding: "1rem" }}>
      <pre style={{ display: "flex", "flex-direction": "column"}}>
        {ws.OPEN && <span style={{ animation: "slow-blink 1.25s linear infinite" }}>_</span>}
        <For each={messages().reverse()}>
          {(message) => (
            <span>{message}</span>
          )}
        </For>
      </pre>
    </Flex>
  )
}

export default Console;
