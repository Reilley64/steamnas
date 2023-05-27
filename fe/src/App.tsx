import Flex from "./components/Flex";
import ConsolePage from "./pages/Console";
import HomePage from "./pages/Home";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import { Link, Route, Routes } from "@solidjs/router";
import Text from "./components/Text";

function App() {
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Flex
        sx={{
          alignItems: "center",
          backgroundColor: "rgba(10, 25, 41, 0.7)",
          backdropFilter: "blur(8px)",
          boxShadow: "rgb(19, 47, 76) 0px -1px 1px 0px inset",
          height: "56px",
          justifyContent: "space-between",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          position: "sticky",
          top: 0,
        }}
      >
        <Text sx={{ color: "white", fontWeight: 700 }}>SteamNAS</Text>

        <Link href="/console" style={{ color: "white" }}>
          <i class="fa-solid fa-terminal" />
        </Link>
      </Flex>
      <Flex
        sx={{
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: "100vw",
          padding: "2rem",
        }}
      >
        <Routes>
          <Route path="/console" component={ConsolePage} />
          <Route path="/" component={HomePage} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
