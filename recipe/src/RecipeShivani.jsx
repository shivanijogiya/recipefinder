// src/RecipeShivani.jsx
import React, { useState } from 'react';

function RecipeShivani() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const apiKey = 'ef33d9d24a094c2f80c3a03480cad02d';
    const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=5&apiKey=${apiKey}`;

    try {
      const res = await fetch(searchUrl);
      const data = await res.json();

      const detailedRecipes = await Promise.all(
        data.results.map(async (recipe) => {
          const detailsRes = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
          );
          const fullData = await detailsRes.json();
          return fullData;
        })
      );

      setRecipes(detailedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#ffeeee' }}>
      <h1>Recipe Finder</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a recipe"
        style={{ marginRight: '10px' }}
      />
      <button onClick={fetchRecipes}>Search</button>

      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ marginTop: '30px' }}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} width="200" />
          <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Instructions:</strong></p>
          <div
            dangerouslySetInnerHTML={{
              __html: recipe.instructions || "No instructions available.",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default RecipeShivani;
