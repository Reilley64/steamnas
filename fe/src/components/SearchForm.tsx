import { useAppIdContext } from "../context/AppIdModalProvider.tsx";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent } from "react";

function SearchForm() {
  const [, setAppId] = useAppIdContext();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setAppId(formData.get("appId") as string);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={submitSearch}>
      <InputGroup size="sm" variant="filled">
        <InputLeftElement pointerEvents="none" sx={{ color: "whiteAlpha.400" }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputLeftElement>

        <Input name="appId" placeholder="Search for apps" sx={{ color: "white" }} />
      </InputGroup>
    </form>
  );
}

export default SearchForm;
