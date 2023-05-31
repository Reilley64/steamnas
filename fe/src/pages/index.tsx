import config from "../config.ts";
import { useAppIdContext } from "../context/AppIdModalProvider.tsx";
import AppType from "../types/AppType.ts";
import { Card, CardBody, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const [, setAppId] = useAppIdContext();

  const getInstalledQuery = useQuery(
    ["getInstalled"],
    async (): Promise<Array<AppType>> => (await fetch(`http://${config.API_URL}/apps`)).json(),
  );

  return (
    <SimpleGrid columns={4} spacing={8}>
      {getInstalledQuery.data?.map((app) => (
        <Card
          onClick={() => setAppId(app.id)}
          variant="outline"
          sx={{
            cursor: "pointer",
            flexDir: "column",
            overflow: "hidden",
            userSelect: "none",
          }}
        >
          <Image alt={app.name} src={app.image} sx={{ h: "auto", objectFit: "cover", w: "100%" }} />

          <CardBody>
            <Text
              sx={{
                color: "white",
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {app.name}
            </Text>

            <Text
              sx={{
                color: "rgb(178, 186, 194)",
                fontSize: "0.875rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {app.developers.join(" • ")}
            </Text>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default Home;
