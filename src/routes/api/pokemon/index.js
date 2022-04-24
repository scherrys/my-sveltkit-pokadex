// this only shows how to work with api endpoints as a demo
export async function get({params}){
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150'
    const res = await fetch(url)
    const data = await res.json()
    const pokemon = data.results.map((data, index) => {
        return {
            name: data.name, 
            id: index +1,
            image: `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
        }
    })
    return {
        status: 200,
        body: pokemon
    }
}