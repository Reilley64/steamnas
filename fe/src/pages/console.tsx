import config from "../config.ts";
import { Flex, Text } from "@chakra-ui/react";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";

function Console() {
  const [messages, setMessages] = useState<Array<{ createdAt: string; message: string }>>([]);

  useEffect(() => {
    const stompClient = Stomp.client(`ws://${config.API_URL}/ws`);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/console", (message) => {
        setMessages((prev) => [...prev, JSON.parse(message.body)]);
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <Flex
      sx={{
        flexGrow: 1,
        maxHeight: "calc(100vh - 56px - 4rem)",
        overflow: "hidden",
      }}
    >
      <Flex
        as="pre"
        sx={{
          bgColor: "black",
          borderRadius: "10px",
          color: "white",
          flexDir: "column",
          flexGrow: 1,
          fontSize: "0.875rem",
          maxH: "100%",
          minH: "100%",
          overflowY: "scroll",
          p: 4,
        }}
      >
        <Text sx={{ animation: "slow-blink 1.25s step-end infinite" }}>_</Text>
        {messages
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map((message) => (
            <Text>{`${message.createdAt}: ${message.message.trim()}`}</Text>
          ))}
      </Flex>
    </Flex>
  );
}

export default Console;
