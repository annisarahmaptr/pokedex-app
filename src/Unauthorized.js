import { Center, Text, Box } from "@chakra-ui/react";

const Unauthorized = () => {
  return (
    <div>
      <Box>
        <Center>
          <Text color="red" fontSize='xl' p={50} as="b">
            <h1>You are not authorized to open this page</h1>
          </Text>
        </Center>
      </Box>
    </div>
  );
};

export default Unauthorized;
