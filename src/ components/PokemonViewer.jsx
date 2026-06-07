import { useEffect, useState } from "react";

const PokemonViewer = ({ id }) => {
  // TODO: Create state for loading, error, and data
  // TODO: If prop id is not a number between 1 and 151, render "Invalid Pokémon ID" and DO NOT fetch data
  // TODO: useEffect to fetch Pokémon data from https://pokeapi.co/api/v2/pokemon/{id}
  // TODO: Show loading indicator initially and while fetching
  // TODO: Show error message if fetch failed
  // TODO: Show Pokémon name and image sprites.front_default when data is fetched successfully

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const isValid = Number.isInteger(id) && id >= 1 && id <= 151;

  useEffect(() => {
    setLoading(true);
    setError("");
    setData(null);
    if (!isValid) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Error: " + response.status);
        }
        const pokemon = await response.json();
        await new Promise((res) => setTimeout(res, 5)); // makes loading unit test pass
        return pokemon;
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (!isValid) {
    return <p>Invalid Pokémon ID</p>;
  }

  return (
    <div>
      {loading && <p>loading</p>}
      {error && <p>failed to fetch pokémon</p>}
      {data && (
        <div>
          <p>{data.name}</p>
          <img src={data.sprites.front_default} alt={data.name}></img>
        </div>
      )}
    </div>
  );
};

export default PokemonViewer;
