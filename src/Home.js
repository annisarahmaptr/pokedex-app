import { Box, Center, Image, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Box >
        <Center>
            <Image src="https://i.pinimg.com/564x/aa/1f/b4/aa1fb4434b6420b808f9d1df9ed518b6.jpg" alt="pokemon"  boxSize='350px'/>
        </Center>
        <Center>
        <Text fontSize='6xl' as="i">
              Welcome!
        </Text>    
        </Center>
      </Box>
    </div>
  );
};

export default Home;
