import { useEffect, useState } from "react";
import { Page } from "../../components/page";
import { Title } from "../../components/title";

let API = `https://pokeapi.co/api/v2/pokemon`;

export function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPokemons = async (loading, pokemons, error) => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(API);
        const jsonResponse = await response.json();
        setPokemons(jsonResponse.results);
      } catch {
        if (loading && pokemons) {
          return <div>Loading yours Pokemon</div>;
        }
        if (!loading && error) {
          setError(true);
        } else {
          alert("empty");
        }
      }
    };
    setLoading(false);
    getPokemons();
  }, []);

  return (
    <Page>
      <Title>Pokemons list</Title>

      <ol className="text-white list-decimal">
        <li>
          [Extra] Add buttons PREVIOUS - NEXT at the bottom so I can load next
          batch of pokemons
        </li>
        <li>
          Handle states:
          <p>Initial</p>
          <p>Loading</p>
          <p>Loaded</p>
          <p>Error</p>
        </li>
        <li>
          Create pokemon profile page, so when I click on selected pokemon I go
          to the specific page where I can see more details about pokemon
          (pokemonId, name, types and avatar). Refer to Favourites, you'll see
          an example. Remember about react-router you have to create new route
          for this and create separate component and separate Route.
        </li>
        <li>
          In detailed view I want to have{" "}
          <span className="font-bold">ADD TO FAVOURITE </span>button which will
          save selected pokemon to{" "}
          <span className="font-bold">localStorage</span> so later I can display
          it in Favourite component. [Extra] Maximum of 6, meaning if I add 7th
          pokemon the first one gets removed from the localStorage
        </li>
      </ol>
      <p className="text-white py-2">
        Example of what I want to see here is something like this
      </p>
      <ol className="poke-font text-white grid grid-cols-2 grid-flow-row-dense gap-1">
        {loading &&
          pokemons.map((pokemon, index) => {
            return (
              <li
                key={pokemon - index}
                className={`hover:bg-red-700 cursor-pointer ${
                  index < 10 ? "col-start-1" : "col-start-2"
                }`}
              >
                #{index + 1} - {pokemon.name}
              </li>
            );
          })}
      </ol>
      {error && <div>some error occured</div>}
    </Page>
  );
}
