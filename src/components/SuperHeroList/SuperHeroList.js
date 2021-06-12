import {
  Button,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Image,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

import {useEffect, useState} from 'react';
// import api from '../../api';
import axios from 'axios';

export function SuperHeroList() {
  const [superheros, setSuperheros] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://www.superheroapi.com/api.php/931794854341970/search/marvel`)
      .then(res => {
        console.log('response= ', res);
        setSuperheros(res.data.results);
        console.log('setSuperheros', res.data.results);
      })
      .catch(error => {
        // setLoading(true);
        console.log(error.res);
      });
  }, []);

  return (
    <Box>
      <Stack direction="row">
        <Input />
        <Button colorScheme="blue">Search</Button>
      </Stack>

      <Table variant="simple">

        <TableCaption>SuperHero Search</TableCaption>

        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Open Modal</Th>
          </Tr>
        </Thead>

        <Tbody>
          {superheros.map(superhero => (
            <Tr>
              <div key={superhero.id} />
              <Td>
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  alt="superhero image"
                  src={superhero.image.url}
                />
              </Td>
              <Td>{superhero.name}</Td>
              <Td>Open Modal</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
