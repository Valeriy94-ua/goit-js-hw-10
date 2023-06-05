export { fetchBreeds, fetchBreedsById };
const API_KEY =
  'live_BGCzZodAgdUZeCqSDYDYN0gSJf5iQBQtyzZCuiGVg1uCxBdQe9rppMG0jH6Genbu';

function fetchBreeds() {
  return fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function fetchBreedsById(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
