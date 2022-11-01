import { useState } from 'react';
import axios from 'axios';

export default function Search() {

    const [searchText, setSearchText] = useState("")
    const [coctailData, setCoctailData] = useState({})

    function searchForCoctail(event) {
        var url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`

        axios.get(url).then(function (response) {
            // success
            setCoctailData(response.data)
        }).catch(function (error) {
            // error
            console.log(error)
        })
    }

    console.log(coctailData)

  return (
    <div className="App">
      <div className="search_form">
        <h1>Coctail Search</h1>
        <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <button onClick={e => searchForCoctail(e)}>Search</button>
      </div>
      {JSON.stringify(coctailData) != '{}' ?
        <div className='coctail_data'>
          <h1>{coctailData.drinks[0].strDrink}</h1><br />
          <h2>Glass</h2><br />
          <p>{coctailData.drinks[0].strGlass}</p><br />
          <h2>Instructions</h2><br />
          <p>{coctailData.drinks[0].strInstructions}</p><br />
          <h2>Ingredients</h2><br />
          <div>
            <p>{coctailData.drinks[0].strIngredient1}</p>
            <p>{coctailData.drinks[0].strIngredient2}</p>
            <p>{coctailData.drinks[0].strIngredient3}</p>
            <p>{coctailData.drinks[0].strIngredient4}</p>
            <p>{coctailData.drinks[0].strIngredient5}</p>
            <p>{coctailData.drinks[0].strIngredient6}</p>
          </div>
          <img src={coctailData.drinks[0].strDrinkThumb} alt="thumbnail" />
        </div>
        :
        <><h2>-- Error no data --</h2></>
      }
    </div>
  )
}
