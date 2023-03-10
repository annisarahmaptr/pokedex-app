import { useEffect, useState } from "react";
import {
  Card,
  HStack,
  CardHeader,
  Heading,
  Box,
  Badge,
  Button,
  Flex,
  Text
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate} from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentpage] = useState(1); 

  const moveTo = (direction) => {
    if (direction === "prev") {
      setSearchParams({page:currentPage -1})
      setCurrentpage(currentPage -1)
    } else if(direction === "next"){
      setSearchParams({page:currentPage + 1})
      setCurrentpage(currentPage + 1)
    }
  };

  useEffect(() => {
    setCurrentpage(parseInt(searchParams.get("page") || 1))
  }, [searchParams])

  return (
    <HStack>
      {currentPage === 1 ? <Button disabled>{"< Prev"}</Button> : 
      <Button colorScheme='yellow' onClick={() => moveTo("prev")}>{"< Prev"}</Button>}
      <Button colorScheme='yellow' onClick={() => moveTo("next")}>{"Next >"}</Button> 
    </HStack>
  );
};

const PokemonList = ({ pokemons }) => {
  const navigate = useNavigate()
  console.log(pokemons)
  return (
    pokemons &&
    pokemons.length > 0 && (
      <Box role="pokemon-list" p={5}>
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card columns={[1,2,4]}>
              <CardHeader>
                <Heading as="h3" size="md">
                  {pokemon.name}
                </Heading>
              </CardHeader>
                
                <HStack onClick={() => {
                  navigate(`/${pokemon.id}`)
                  }}>
                  <Image src={pokemon.sprites.front_default} alt="Front Default"/>
                  <Image src={pokemon.sprites.back_default} alt="Back Default"/>
                  <Image src={pokemon.sprites.front_shiny} alt="Front Shiny"/>
                  <Image src={pokemon.sprites.back_shiny} alt="Back Shiny"/>
                </HStack>

                <Flex gap={2} p={5}>
                  {pokemon.types?.map((typePokemon, index) => {
                      return(
                        <Badge key={index}>
                          {typePokemon.type.name}
                        </Badge>
                      )
                      })}
                </Flex>
            </Card>
          </Link>

          
        ))}
      </Box>
    )
  );
  
};
const Home = () => {
  //get list
  const fetchPokemons = async (page) => {
    //get pokemon list with image
    const displayPerPage = 20;
    const offset = (page - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${displayPerPage}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return pokemonData;
    });

    //set pokemonList to state
    setPokemons(await Promise.all(pokemonList));
  };

  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    fetchPokemons(page);
  }, [searchParams]);

  return (
    <>
      <Heading as="h2" size="lg">
        <Text as="cite">
          Pokemon List
        </Text>
      </Heading>
      <Pagination />
      <PokemonList pokemons={pokemons} />
    </>
  );
};

export default Home;
