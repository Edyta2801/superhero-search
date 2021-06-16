import {
  Button,
  Image,
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
  SimpleGrid,
  Progress,
  Grid,
  GridItem,
  Badge,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import hero from '../../hero.jpg';

import {useState, useRef} from 'react';
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
              <UnorderedList>
                {superhero.biography['aliases'].map((alias, index) => (
                  <ListItem key={index}>{alias}</ListItem>
                ))}
              </UnorderedList>
              <Text color="gray.500">Place-of-birth</Text>
              <Text>{superhero.biography['place-of-birth']}</Text>
              <Text color="gray.500">First-appearance</Text>
              <Text>{superhero.biography['first-appearance']}</Text>
              <Text color="gray.500">Publisher</Text>
              <Text>{superhero.biography['publisher']}</Text>
              <Text color="gray.500">Alignment</Text>
              <Text>{superhero.biography['alignment']}</Text>
            </SimpleGrid>

            <Heading
              my="10"
              align="center"
              as="h4"
              size="md"
              style={{display: superhero.powerstats['intelligence'] !== 'null' ? 'block' : 'none'}}
            >
              Powerstats
            </Heading>

            <Grid
              h="20px"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(8, 1fr)"
              style={{display: superhero.powerstats['intelligence'] !== 'null' ? '' : 'none'}}
            >
              <GridItem colSpan={2}>
                <Text color="gray.500">Intelligence</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Badge ml="1" as="sup">
                  {superhero.powerstats['intelligence'] !== 'null'}
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
                  {superhero.powerstats['strength'] !== 'null'}
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
                  {superhero.powerstats['speed'] !== 'null'}
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
                  {superhero.powerstats['durability'] !== 'null'}
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
                  {superhero.powerstats['power'] !== 'null'}
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
                  {superhero.powerstats['combat'] !== 'null'}
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
