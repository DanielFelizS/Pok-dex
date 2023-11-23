const pokeDatos = document.querySelector('#pokemon-datos');
const btn = document.querySelector('#btn');
const search = document.querySelector('#search');
const btn_tipos = document.querySelectorAll('.btn-tipos button');

function buscarPokemon(data) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${data.name}`;
  fetch(URL)
    .then((res) => res.json())
    .then((pokemonData) => {
      const UrlSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;

      // pokeDatos.innerHTML = ''; // Limpiar datos existentes

      const id = document.createElement('p');
      id.textContent = 'Id: ' + pokemonData.id;

      const name = document.createElement('p');
      name.textContent = 'Nombre: ' + pokemonData.name;

      const altura = document.createElement('p');
      altura.textContent = 'Altura: ' + pokemonData.height + 'M';

      const peso = document.createElement('p');
      peso.textContent = 'Peso: ' + pokemonData.weight + 'KG';

      const sprite = document.createElement('img');
      sprite.src = UrlSprite;
      sprite.alt = `${pokemonData.name}`;

      const tipos = pokemonData.types.map((type) => {
        const tipo = document.createElement('button');
        tipo.id = type.type.name;
        // tipo.setAttribute('id', `${type.type.name}`);
        tipo.textContent = type.type.name;
        return tipo;
      });
      const pokeDiv = document.createElement('div');
      pokeDiv.classList.add('pokemon');
      pokeDiv.appendChild(id);
      pokeDiv.appendChild(sprite);
      pokeDiv.appendChild(name);
      pokeDiv.appendChild(altura);
      pokeDiv.appendChild(peso);
      tipos.forEach((tipo) => {
        pokeDiv.appendChild(tipo);
      });
      pokeDatos.appendChild(pokeDiv);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function mostrarPokemons() {
  const ids = Array.from({ length: 151 }, (_, i) => i + 1);
  for (const id of ids) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      buscarPokemon(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

btn.addEventListener("click", () => {
  const searchValue = search.value.toLowerCase();
  if (searchValue) {
    buscarPokemon({ name: searchValue });
  }
});         

btn_tipos.forEach((boton) => {
  boton.addEventListener('click', (e) => {
    const botonId = e.currentTarget.id;
    pokeDatos.innerHTML = '';
    for (let i = 1; i <= 400; i++) {
      const URL = `https://pokeapi.co/api/v2/pokemon/${i}`;
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          const pokeTipos = data.types.map((type) => type.type.name);
          if (pokeTipos.includes(botonId)) {
            buscarPokemon(data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
});