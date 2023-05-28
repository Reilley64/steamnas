import SearchForm from "../components/SearchForm.tsx";
import AppIdModalProvider from "../context/AppIdModalProvider.tsx";
import theme from "../theme.ts";
import { Box, ChakraProvider, DarkMode, Flex, HStack, Text } from "@chakra-ui/react";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: 10000, suspense: true },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <DarkMode>
          <AppIdModalProvider>
            <Flex sx={{ flexDir: "column" }}>
              <Flex
                sx={{
                  alignItems: "center",
                  bgColor: "rgba(10, 25, 41, 0.7)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "rgb(19, 47, 76) 0px -1px 1px 0px inset",
                  h: "56px",
                  justifyContent: "space-between",
                  px: 8,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  <Text sx={{ fontWeight: 700 }}>SteamNAS</Text>
                </Link>

                <HStack spacing={8}>
                  <SearchForm />

                  <Link to="/console" style={{ color: "white" }}>
                    <Box>
                      <FontAwesomeIcon icon={faTerminal} />
                    </Box>
                  </Link>
                </HStack>
              </Flex>

              <Flex
                sx={{
                  flexDir: "column",
                  minH: "calc(100vh - 56px)",
                  minW: "100vw",
                  p: "2rem",
                }}
              >
                <Outlet />
              </Flex>
            </Flex>
          </AppIdModalProvider>
        </DarkMode>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
