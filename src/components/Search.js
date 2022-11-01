import { useState } from 'react';
import axios from 'axios';

export default function Search() {

    const [searchText, setSearchText] = useState("")
    const [cocktailData, setCocktailData] = useState({})

    function searchForCocktail(event) {
        var url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`

        axios.get(url).then(function (response) {
            // success
            setCocktailData(response.data)
        }).catch(function (error) {
            // error
            console.log(error)
        })
    }

  return (
    <div id="search_container">
      <div id="search_form">
        <h1>Cocktail Search</h1>
        <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <button onClick={e => searchForCocktail(e)}>Search</button>
      </div>
      {JSON.stringify(cocktailData) != '{}' ?
        <div className='cocktail_data'>
          <h1>{cocktailData.drinks[0].strDrink}</h1><br />
          <h2>Glass</h2><br />
          <p>{cocktailData.drinks[0].strGlass}</p><br />
          <h2>Instructions</h2><br />
          <p>{cocktailData.drinks[0].strInstructions}</p><br />
          <h2>Ingredients</h2><br />
          <div>
            <p>{cocktailData.drinks[0].strIngredient1}</p>
            <p>{cocktailData.drinks[0].strIngredient2}</p>
            <p>{cocktailData.drinks[0].strIngredient3}</p>
            <p>{cocktailData.drinks[0].strIngredient4}</p>
            <p>{cocktailData.drinks[0].strIngredient5}</p>
            <p>{cocktailData.drinks[0].strIngredient6}</p>
          </div>
          <img src={cocktailData.drinks[0].strDrinkThumb} alt="thumbnail" />
        </div>
        :
        <><h2>-- Error no data --</h2></>
      }
    </div>
  )
}
