<script context="module">
	// Server render
	export async function load({ params }) {
		const url = 'https://pokeapi.co/api/v2/pokemon?limit=150'
    const res = await fetch(url)
    const data = await res.json()
    const loadedPokemon = data.results.map((data, index) => {
        return {
            name: data.name, 
            id: index +1,
            image: `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
        }
    })
    return { props: { pokemon: loadedPokemon } }
	}
</script>
<script>
	// applikation render
	import PokemanCard from '../components/pokemanCard.svelte';
	export let pokemon

	let searchTerm = '';
	let filteredPokemon = [];

	$: {
		if (searchTerm) {
			filteredPokemon = pokemon.filter((pokeman) => pokeman.name.toLowerCase().includes(searchTerm))
		} else {
			filteredPokemon = [...pokemon];
		}
	}
</script>

<svelte:head>
	<title>Svelte Kit PokaDex</title>
</svelte:head>

<h1 class="text-4xl text-center my-8 uppercase">Svelte Kit Pokedex</h1>
<input
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200 my-4"
	type="text"
	placeholder="Search Pokemon"
	bind:value={searchTerm}
/>
<div class="grid gap-4 md:grid-cols-2 grid-cols-1">
	{#each filteredPokemon as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>
