import {
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Avatar,
} from '@chakra-ui/react';

import  {DescriptionModal}  from '../DescriptionModal/DescriptionModal';

export function SuperHeroTable({superheros, hasError}) {
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
          {(hasError || !Array.isArray(superheros)) && <p>An error has occurred</p>}
          {superheros.map(superhero => (
            <Tr key={superhero.id}>
              <Td>
                <Avatar
                  borderRadius="full"
                  boxSize={{base: '100px', md: '150px'}}
                  objectFit="cover"
                  alt="superhero image"
                  src={superhero.image.url}
                  // fallbackSrc={hero}
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
