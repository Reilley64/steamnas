import AppType from "../types/AppType.ts";
import {
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import {
  faBuilding,
  faCar,
  faChessKnight,
  faComputer,
  faCouch,
  faDragon,
  faFootball,
  faGlasses,
  faGun,
  faPersonHiking,
  faSackDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Dispatch, ReactNode, SetStateAction, cloneElement, createContext, useContext, useState } from "react";

const genreMap = new Map([
  ["Action", <FontAwesomeIcon icon={faGun} fixedWidth />],
  ["Adventure", <FontAwesomeIcon icon={faPersonHiking} fixedWidth />],
  ["Casual", <FontAwesomeIcon icon={faCouch} fixedWidth />],
  ["Free to Play", <FontAwesomeIcon icon={faSackDollar} fixedWidth />],
  ["Indie", <FontAwesomeIcon icon={faGlasses} fixedWidth />],
  ["Racing", <FontAwesomeIcon icon={faCar} fixedWidth />],
  ["RPG", <FontAwesomeIcon icon={faDragon} fixedWidth />],
  ["Simulation", <FontAwesomeIcon icon={faComputer} fixedWidth />],
  ["Sports", <FontAwesomeIcon icon={faFootball} fixedWidth />],
  ["Strategy", <FontAwesomeIcon icon={faChessKnight} fixedWidth />],
]);

const context = createContext<[string | null, Dispatch<SetStateAction<string | null>>] | undefined>(undefined);

function AppIdModalProvider(props: { children: ReactNode }) {
  const { children } = props;

  const navigate = useNavigate();

  const appIdState = useState<string | null>(null);

  const [appId, setAppId] = appIdState;

  const getAppQuery = useQuery(
    ["getApp", appId],
    async (): Promise<AppType> => (await fetch(`http://192.168.0.91:10100/app/${appId}`)).json(),
    { enabled: !!appId, suspense: false },
  );
  const app = getAppQuery.data!;

  const installAppMutation = useMutation(
    async (): Promise<AppType> =>
      (await fetch(`http://192.168.0.91:10100/install/${appId}`, { method: "POST" })).json(),
    {
      onSuccess: () => {
        setAppId(null);
        navigate({ to: "/console" });
      },
    },
  );

  return (
    <context.Provider value={appIdState}>
      {children}

      <Modal isOpen={!!appId} onClose={() => setAppId(null)} size="lg">
        <ModalOverlay />

        {getAppQuery.isSuccess && (
          <ModalContent>
            <ModalBody sx={{ p: 5 }}>
              <VStack spacing={4} sx={{ alignItems: "unset", overflow: "hidden" }}>
                <Image alt={app.name} src={app.image} sx={{ height: "auto", borderRadius: "10px", width: "100%" }} />

                <Text
                  sx={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {app.name}
                </Text>

                <HStack spacing={4}>
                  {app.genres.map((genre) => cloneElement(genreMap.get(genre)!, { key: genre }))}
                </HStack>

                <HStack spacing={4} sx={{ fontSize: "0.875rem", overflow: "hidden" }}>
                  <HStack spacing={2} sx={{ flexBasis: "50%", overflow: "hidden" }}>
                    <FontAwesomeIcon icon={faUser} fixedWidth />
                    <Tooltip label={app.developers.join(" • ")}>
                      <Text
                        sx={{
                          color: "rgb(178, 186, 194)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {app.developers.join(" • ")}
                      </Text>
                    </Tooltip>
                  </HStack>

                  <HStack spacing={2} sx={{ flexBasis: "50%", overflow: "hidden" }}>
                    <FontAwesomeIcon icon={faBuilding} fixedWidth />
                    <Tooltip label={app.publishers.join(" • ")}>
                      <Text
                        sx={{
                          color: "rgb(178, 186, 194)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {app.publishers.join(" • ")}
                      </Text>
                    </Tooltip>
                  </HStack>
                </HStack>

                <Text sx={{ fontSize: "0.875rem" }}>{app.description}</Text>

                {app.installed ? (
                  <Button>Uninstall</Button>
                ) : (
                  <Button isLoading={installAppMutation.isLoading} onClick={() => installAppMutation.mutate()}>
                    Install
                  </Button>
                )}
              </VStack>
            </ModalBody>
          </ModalContent>
        )}
      </Modal>
    </context.Provider>
  );
}

function useAppIdContext() {
  const contextValue = useContext(context);

  if (contextValue === undefined) {
    throw new Error("useAppIdContext must be used within a AppIdModalProvider");
  }

  return contextValue;
}

export default AppIdModalProvider;
export { useAppIdContext };
