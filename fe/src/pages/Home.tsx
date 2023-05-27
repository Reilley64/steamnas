import Flex from "../components/Flex";
import Grid from "../components/Grid";
import { For, createResource } from "solid-js";
import Text from "../components/Text";

async function fetchInstalled(): Promise<Array<{ id: string; name: string; developers: Array<string>, image: string }>> {
  const response = await fetch("http://192.168.0.91:10100/installed", {
    mode: "cors",
    headers: { Accept: "application/json" },
  });
  return response.json();
}

function Home() {
  const [installed] = createResource(fetchInstalled);

  return (
    <Grid columns={4} sx={{ gap: "2rem" }}>
      <For each={installed()}>
        {(app) => (
          <Flex
            sx={{
              backgroundColor: "rgb(0, 30, 60)",
              border: "1px solid #1e4976",
              borderRadius: "10px",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <img alt={app.name} src={app.image} style={{ height: "auto", width: "100%" }} />
            <Flex sx={{ flexDirection: "column", padding: "1rem" }}>
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
            </Flex>
          </Flex>
        )}
      </For>
    </Grid>
  );
}

export default Home;
