import { Input, InputGroup, InputLeftElement, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  return (
    <Box
      maxW="20%"
      mx="auto"
      ml="20px"
      border="1px solid gray"
      borderRadius="20px"
      overflow="hidden"
    >
      <InputGroup color="gray.500">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.500" />}
        />
        <Input type="text" placeholder="Search..." color="blue.900" border="none" />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
