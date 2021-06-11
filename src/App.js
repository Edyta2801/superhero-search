import React from 'react';
import {ChakraProvider, Box, theme} from '@chakra-ui/react';
import {ColorModeSwitcher} from './ColorModeSwitcher';
import {SuperHeroList} from './components/SuperHeroList';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign={{base: 'center', md: 'right'}} mt="2" mr="2">
        <ColorModeSwitcher />
      </Box>
      <SuperHeroList />
    </ChakraProvider>
  );
}

export default App;
