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
} from '@chakra-ui/react';

import hero from '../../hero.jpg';
import {useEffect, useState, useRef} from 'react';
// import api from '../../api';
import axios from 'axios';

// import {SuperHeroTable} from '../SuperHeroTable';

export function SuperHeroList() {
  const [superheros, setSuperheros] = useState([]);
  const [searchTermInput, setSearchTermInput] = useState('');
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`https://www.superheroapi.com/api.php/931794854341970/search/marvel`)
  //     .then(res => {
  //       console.log('response= ', res);
  //       setSuperheros(res.data.results);
  //       console.log('setSuperheros', res.data.results);
  //     })
  //     .catch(error => {
  //       // setLoading(true);
  //       console.log(error.res);
  //     });
  // }, []);

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
        <Button
          onClick={() => {
            axios
              .get(`https://www.superheroapi.com/api.php/931794854341970/search/${searchTermInput}`)
              .then(res => {
                console.log('response= ', res);
                setSuperheros(res.data.results);
                console.log('setSuperheros', res.data.results);
              })
              .catch(error => {
                // setLoading(true);
                console.log(error.res);
              });
          }}
          colorScheme="blue"
        >
          Search
        </Button>
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
      <RadioGroup value={scrollBehavior} onChange={e => setScrollBehavior(e.target.value)}>
        {/* <Stack direction="row">
          <Radio value="inside">inside</Radio>
          <Radio value="outside">outside</Radio>
        </Stack> */}
      </RadioGroup>
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
            <SimpleGrid columns={2}>
              <Text color="gray.500">Intelligence</Text>
              <Progress value={superhero.powerstats['intelligence']} />
              <Text color="gray.500">Strength</Text>
              <Progress value={superhero.powerstats['strength']} />
              <Text color="gray.500">Speed</Text>
              <Progress value={superhero.powerstats['speed']} />
              <Text color="gray.500">Durability</Text>
              <Progress value={superhero.powerstats['durability']} />
              <Text color="gray.500">Power</Text>
              <Progress value={superhero.powerstats['power']} />
              <Text color="gray.500">Combat</Text>
              <Progress value={superhero.powerstats['combat']} />
            </SimpleGrid>

            {console.log(Object.entries(superhero.biography)[0][1])}
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
