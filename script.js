const pokemonCount=300 // total number of pokemons

var pokedex={}
window.onload= async function()
{
    // getpokemon(2)
   
    for(let i=1;i<=pokemonCount;i++)
    {
        await getpokemon(i)
        let pokemon=document.createElement("div")
        pokemon.id=i
       pokemon.innerText = "    "+ i.toString() + " .    " + pokedex[i]['name'].toUpperCase();
 
    pokemon.classList.add('pokemon-name')
    pokemon.addEventListener('click',upadate)
    document.getElementById('pokemon-list').append(pokemon)
    
}
}

const getpokemon = async(num)=>
{
    let api='https://pokeapi.co/api/v2/pokemon/'+num.toString();
    let result= await fetch(api)
    let pokemons= await result.json()
  
    let name=pokemons['name']
    let type=pokemons['types']
    let imgs=pokemons['sprites']['front_default']
    res= await fetch(pokemons['species']['url']);
    let description =await res.json()
    
    description= description['flavor_text_entries'][8]['flavor_text']
    pokedex[num]=   {"name":name,"img":imgs,"types":type,"description":description}
   
}
function upadate()
{
 document.getElementById('pokemon-imgs').src=pokedex[this.id]['img']
   let typesDiv = document.querySelector(".details");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }
     let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }
    document.querySelector(".description").innerText = pokedex[this.id]["description"];
}