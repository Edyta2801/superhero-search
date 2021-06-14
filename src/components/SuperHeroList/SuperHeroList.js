import {
  Button,
  Input,
  Stack,
  CircularProgress,
  Tag,
  Center
} from '@chakra-ui/react';

import {useEffect, useState} from 'react';
import axios from 'axios';
import {useDebounce} from '../../hooks/useDebounce';

import {SuperHeroTable} from '../SuperHeroTable';

const accessToken='931794854341970';


async function getSuperhero({searchTermInput, setSuperheros, setIsLoading, setError}) {
  if (searchTermInput === '') {
    return;
  }
  setIsLoading(true);
  try {
    await axios
      .get(`https://www.superheroapi.com/api.php/${accessToken}/search/${searchTermInput}`)
      .then(res => {
        console.log('response= ', res);
        setSuperheros(res.data.results);
        console.log('setSuperheros', res.data.results);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
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
  const [hasError, setError] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTermInput, 500);

  useEffect(() => {
    getSuperhero({
      searchTermInput: debouncedSearchTerm,
      setSuperheros,
      setIsLoading,
      setError,
    });
  }, [debouncedSearchTerm]);

  const suggestionsForInput = getSuggestions(searchTermInput);

  useEffect(() => {
    setSuggestions(suggestionsForInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestionsForInput.join('')]);


  if (hasError || !Array.isArray(superheros)) {
    return <Center>There was an error loading your data! Refresh the page and try again :)</Center>;
  }

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
      {(hasError || !Array.isArray(superheros)) && <p>An error has occurred</p>}
      <Stack direction="row" justifyContent="center">
        {suggestions.map(suggestion => (
          <Tag key={suggestion}>{suggestion}</Tag>
        ))}
      </Stack>
      <SuperHeroTable superheros={superheros}  />
    </Stack>
  );
}


