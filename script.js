const pokemonWrapper = document.getElementById("pokeWrapperID");

let results = [];
const limit = 2;
let offset = 0;

async function fetchPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  const resolve = await fetch(url);
  const pokemon = await resolve.json();
  offset += limit;
  results = pokemon["results"];
  
  displayPokemon();

  console.log(results);
}
fetchPokemon();

function getPokemonID(pokemon) {
  return pokemon.url.replace(
      "https://pokeapi.co/api/v2/pokemon/",
      ""
    ).replace("/", "");  
}

function createImg(pokemon) {
  const id = getPokemonID(pokemon)

  const image = document.createElement("div");
  image.classList.add("pokeIMG");

  const imgElement = document.createElement("img");
  let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  imgElement.src = url;

  image.appendChild(imgElement);
  return image;
}

function displayPokemon() {
  results.forEach((pokemon) => {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemonCard");

  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const image = createImg(pokemon);

  const pokemonHTML = 
  `<div class="container">
    <div class="row">
      <div class="col">${pokemonName}</div>
    </div>
  </div>
  `;

  pokemonCard.innerHTML = pokemonHTML;
  pokemonWrapper.appendChild(image);

  pokemonWrapper.appendChild(pokemonCard);
  });

}

