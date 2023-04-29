import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Box bg="blue.300" w="100%" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Link href="/" passHref>
          <Text color="white" fontWeight="bold" fontSize="2xl" cursor="pointer">
            POSTHUB
          </Text>
        </Link>
        <Link href="/create-post" passHref>
          <Button colorScheme="teal" variant="solid">
            Create Post
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Header;
