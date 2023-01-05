import { useEffect, useState } from "react";
import { Badge, Tr, Td, HStack, VStack, Heading, Box, Flex } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Table } from "@chakra-ui/react";
import { Tbody } from "@chakra-ui/react";

const Detail = ({ pokemon }) => {
  return (
    <Box>
      {pokemon && (
        <Box role="pokemon-detail">
          <Heading>
            {pokemon.name}
          </Heading>
          <Flex p={5} gap={5}>
            {pokemon.types.map((pokemonType, index) => {
              return (
                <Badge key={index}>
                  {pokemonType.type.name}
                </Badge>
              )
            })}
          </Flex>

          <HStack>
            <Image src={pokemon.sprites.front_default} />
            <Image src={pokemon.sprites.back_default} />
            <Image src={pokemon.sprites.front_shiny} />
            <Image src={pokemon.sprites.back_shiny} />
          </HStack>

          <VStack>
            <Table>
              <thead>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>Height</Td>
                  <Td>{pokemon.height}</Td>
                </Tr>
                <Tr>
                  <Td>Weight</Td>
                  <Td>{pokemon.weight}</Td>
                </Tr>
                <Tr>
                  <Td>Base Experience</Td>
                  <Td>{pokemon.base_experience}</Td>
                </Tr>
                <Tr>
                  <Td>Base Experience</Td>
                  <Td>{pokemon.abilities.map((ablts, index) => {
                    return (
                      <p key={index}>{ablts.ability.name}</p>
                    )
                  })}</Td>
                </Tr>
                <Tr>
                  <Td>Stats</Td>
                  <Td>
                    {pokemon.stats.map((s, index) => {
                      return (
                        <p key={index}>{s.stat.name} : {s.base_stat}</p>
                      )
                    })}
                  </Td>
                </Tr>
              </tbody>

            </Table>
          </VStack>
        </Box>
      )}
    </Box>
  );
};
const Page = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    setPokemon(data);
  };

  useEffect(() => {
    fetchPokemon(pokemonId)
  }, [pokemonId]);

  return <Detail pokemon={pokemon} />;
};

export default Page;
