import Flex from "./components/Flex";
import {createResource} from "solid-js";

async function fetchInstalled() {
  const response = await fetch("http://192.168.0.91:10100/installed", { mode: "cors", headers: { Accept: "application/json" } });
  return response.json()
}

function App() {
  const [installed] = createResource(fetchInstalled);

  return (
    <Flex
      sx={{
        backgroundColor: "rgb(27, 40, 56)",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100vw",
        padding: "2rem",
      }}
    >
      <Flex>
        <pre>{JSON.stringify(installed(), null, 2)}</pre>
      </Flex>
    </Flex>
  );
}

export default App;
