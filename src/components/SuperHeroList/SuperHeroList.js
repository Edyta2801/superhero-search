import {
  Button,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Image,
  Th,
  Td,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  RadioGroup,
  Heading,
  Avatar,
  SimpleGrid,
  Progress,
  Grid,
  GridItem,
  Badge,
  CircularProgress,
  Tag,
} from '@chakra-ui/react';

import hero from '../../hero.jpg';
import {useEffect, useState, useRef} from 'react';
// import api from '../../api';
import axios from 'axios';
import {useDebounce} from '../../hooks/useDebounce';

// import {SuperHeroTable} from '../SuperHeroTable';

async function getSuperhero({searchTermInput, setSuperheros, setIsLoading}) {
  if (searchTermInput === '') {
    return;
  }
  setIsLoading(true);
  try {
    const getResponse = async () => {
      await axios
        .get(`https://www.superheroapi.com/api.php/931794854341970/search/${searchTermInput}`)
        .then(res => {
          console.log('response= ', res);
          setSuperheros(res.data.results);
          console.log('setSuperheros', res.data.results);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getResponse();
  } finally {
    setIsLoading(false);
  }
}

const words = ['marvel', 'batman', 'cat'];

function getSuggestions(searchTerm) {
  if (!searchTerm) {
    return [];
  }
  return words.filter(word => word.startsWith(searchTerm));
}

export function SuperHeroList() {
  const [superheros, setSuperheros] = useState([]);
  const [searchTermInput, setSearchTermInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTermInput, 500);

  useEffect(() => {
    getSuperhero({
      searchTermInput: debouncedSearchTerm,
      setSuperheros,
      setIsLoading,
    });
  }, [debouncedSearchTerm]);

  const suggestionsForInput = getSuggestions(searchTermInput);

  useEffect(() => {
    setSuggestions(suggestionsForInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestionsForInput.join('')]);

  return (
    <Stack>
      <Stack direction="row" mx="5" my="5" justifyContent="center">
        <Input
          maxWidth="40vw"
          variant="filled"
          placeholder="Type superhero"
          value={searchTermInput}
          onChange={event => setSearchTermInput(event.target.value)}
        />
        {isLoading && <CircularProgress isIndeterminate color="green.300" size={30} />}
        <Button
          colorScheme="blue"
          onClick={() =>
            getSuperhero({
              searchTermInput,
              setSuperheros,
              setIsLoading,
            })
          }
        >
          Search
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="center">
        {suggestions.map(suggestion => (
          <Tag key={suggestion}>{suggestion}</Tag>
        ))}
      </Stack>
      <SuperHeroTable superheros={superheros} />
    </Stack>
  );
}

export function SuperHeroTable({superheros}) {
  return (
    <Stack align="center">
      <Table variant="simple" width={{base: '90vw', md: '50vw'}}>
        <TableCaption>SuperHero Search</TableCaption>

        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>

        <Tbody>
          {superheros.map(superhero => (
            <Tr key={superhero.id}>
              <Td>
                <Avatar
                  borderRadius="full"
                  boxSize={{base: '100px', md: '150px'}}
                  objectFit="cover"
                  alt="superhero image"
                  src={superhero.image.url}
                  fallbackSrc={hero}
                />
              </Td>
              <Td>{superhero.name}</Td>
              <Td>
                <DescriptionModal superhero={superhero} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
}

export function DescriptionModal({superhero}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState('inside');

  const btnRef = useRef();
  return (
    <>
      <RadioGroup value={scrollBehavior} onChange={e => setScrollBehavior(e.target.value)} />
      <Button ref={btnRef} onClick={onOpen} colorScheme="blue">
        Show details
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="center" as="h4" size="md">
            {superhero.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              justifyContent="center"
              alignItems="center"
              boxSize={{base: '80vw', md: '28vw'}}
              objectFit="cover"
              src={superhero.image.url}
              fallbackSrc={hero}
            />
            <Heading my="10" align="center" as="h4" size="md">
              Biography
            </Heading>
            <SimpleGrid columns={2} spacing={4}>
              <Text color="gray.500">Full-name</Text>
              <Text>{superhero.biography['full-name']}</Text>
              <Text color="gray.500">Alter-ego</Text>
              <Text>{superhero.biography['alter-egos']}</Text>
              <Text color="gray.500">Aliases</Text>
              <Text>{superhero.biography['aliases']}</Text>
              <Text color="gray.500">Place-of-birth</Text>
              <Text>{superhero.biography['place-of-birth']}</Text>
              <Text color="gray.500">First-appearance</Text>
              <Text>{superhero.biography['first-appearance']}</Text>
              <Text color="gray.500">Publisher</Text>
              <Text>{superhero.biography['publisher']}</Text>
              <Text color="gray.500">Alignment</Text>
              <Text>{superhero.biography['alignment']}</Text>
            </SimpleGrid>
            <Heading my="10" align="center" as="h4" size="md">
              Powerstats
            </Heading>

            <Grid h="20px" templateRows="repeat(2, 1fr)" templateColumns="repeat(8, 1fr)">
              <GridItem colSpan={2}>
                <Text color="gray.500">Intelligence</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Badge ml="1" as="sup">
                  {superhero.powerstats['intelligence']}
                </Badge>
              </GridItem>
              <GridItem colSpan={5}>
                <Progress size="md" value={superhero.powerstats['intelligence']} />
              </GridItem>

              <GridItem colSpan={2}>
                <Text color="gray.500">Strength</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Badge as="sup" ml="1">
                  {superhero.powerstats['strength']}
                </Badge>
              </GridItem>
              <GridItem colSpan={5}>
                <Progress size="md" value={superhero.powerstats['strength']} />
              </GridItem>

              <GridItem colSpan={2}>
                <Text color="gray.500">Speed</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Badge as="sup" ml="1">
                  {superhero.powerstats['speed']}
                </Badge>
              </GridItem>
              <GridItem colSpan={5}>
                <Progress size="md" value={superhero.powerstats['speed']} />
              </GridItem>

              <GridItem colSpan={2}>
                <Text color="gray.500">Durability</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Badge as="sup" l="1">
                  {superhero.powerstats['durability']}
                </Badge>
              </GridItem>
              <GridItem colSpan={5}>
                <Progress size="md" value={superhero.powerstats['durability']} />
              </GridItem>

              <GridItem colSpan={2}>
                <Text color="gray.500">Power</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Badge as="sup" ml="1">
                  {superhero.powerstats['power']}
                </Badge>
              </GridItem>
              <GridItem colSpan={5}>
                <Progress size="md" value={superhero.powerstats['power']} />
              </GridItem>
              <GridItem colSpan={2}>
                <Text color="gray.500">Combat</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Badge as="sup" ml="1">
                  {superhero.powerstats['combat']}
                </Badge>
              </GridItem>
              <GridItem colSpan={5}>
                <Progress size="md" value={superhero.powerstats['combat']} />
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
