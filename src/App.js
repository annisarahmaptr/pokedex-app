import { Box, HStack, Container, Heading, Center, Text } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Pokemon from "./PokemonList";
import { Link } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import PokemonLegend from "./PokemonLegend";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Unauthorized";
import { useNavigate } from "react-router-dom";

const App = () => {
  let navigate = useNavigate();
  const enterSecretPage = () => {
    navigate("/legend?password=secret");
  };

  return (
    <Container marginTop="2">
      <Box marginBottom={5}>
        <Center>
          <Heading as="h1" color="#0000FF" size="4xl"><Text as="cite">PokeDeh</Text></Heading>
        </Center>
        <br />
        <Center>
          <HStack spacing="4">
            <Box borderRadius='50' bg='yellow' px={4} h={8}>
              <Link to="/"><Text as="b" color="red">Home</Text></Link>
            </Box>
            <Box borderRadius='50' bg='yellow' px={4} h={8}>
              <Link to="/pokemon"><Text as="b" color="red">Pokemon</Text></Link>
            </Box>
            <Box borderRadius='50' bg='yellow' px={4} h={8}>
              <Link to="/legend" onDoubleClick={enterSecretPage}>
                <Text as="b" color="red">Legend</Text>
              </Link>
            </Box>
          </HStack>
        </Center>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pokemon">
          <Route index element={<Pokemon />} />
          <Route path=":pokemonId" element={<PokemonDetail />} />
        </Route>
        <Route path="legend" element={<ProtectedRoute><PokemonLegend /></ProtectedRoute>} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
    </Container>
  );
};

export default App;
