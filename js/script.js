const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");
const form = document.querySelector(".form-pokemon");
const input = document.querySelector(".input-search");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
let searchPokemon = 1;

async function fetchPokemon(pokemon) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (res.status === 200) {
        const data = await res.json();
        return data;
    }
}

async function renderPokemon(pokemon) {
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = "block";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src =
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"];
        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = "";
    }
}

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

prevBtn.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

nextBtn.addEventListener("click", () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
