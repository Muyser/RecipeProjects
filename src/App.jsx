import { useEffect, useState } from "react";
import { RecipeCard } from "./components/RecipeCard";
import { SearchBar } from "./components/SearchBar";
import "./App.css";


const APIURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
function App() {
  const [isLoading, setIsLoadong] = useState(false);
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState([]);

  const searRecipe = async () => {
    setIsLoadong(true);
    const url = APIURL + query;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    setRecipe(data.meals);
    setIsLoadong(false);
  }

  useEffect (()=> {
    searRecipe();
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    searRecipe();
  }
  return (
    <div className="container">
      <h2>My Recipe App</h2>
      <SearchBar 
      handleSubmit={handleSubmit}
      value={query}
      onChange={event => setQuery(event.target.value)}
      isLoading={isLoading}
      />
      <div className="recipe">
        {recipe ? recipe.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe}/>
        )) : "No Recipes"}
      </div>
    </div>
  )
}

export default App;

