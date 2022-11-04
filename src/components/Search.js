import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card, InputGroup, Button, FormControl} from 'react-bootstrap';

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
    <Container fluid='xl'>
        <div id="search_form">
          <h1>Cocktail Search</h1>
          <InputGroup className='mb-3' size='1g'>
            <FormControl
              placeholder='Search for a cocktail'
              type='input'
              onKeyPress={e =>{
                if(e.key == "Enter"){
                  searchForCocktail(e)
                }
              }}
              onChange={e => setSearchText(e.target.value)}
            />
            <Button onClick={e => searchForCocktail(e)}>
              Search
            </Button>
            
          </InputGroup>
          {/* <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
          <Button onClick={e => searchForCocktail(e)}>Search</Button> */}
        </div>
        {JSON.stringify(cocktailData) != '{}' ?
          <Card>
            <Card.Title>{cocktailData.drinks[0].strDrink}</Card.Title>
            <Card.Subtitle>Glass</Card.Subtitle>
            <Card.Body>{cocktailData.drinks[0].strGlass}</Card.Body>
            <Card.Subtitle>Instructions</Card.Subtitle>
            <Card.Body>{cocktailData.drinks[0].strInstructions}</Card.Body>
            <Card.Subtitle>Ingredients</Card.Subtitle>
            <div>
              <p>{cocktailData.drinks[0].strIngredient1}</p>
              <p>{cocktailData.drinks[0].strIngredient2}</p>
              <p>{cocktailData.drinks[0].strIngredient3}</p>
              <p>{cocktailData.drinks[0].strIngredient4}</p>
              <p>{cocktailData.drinks[0].strIngredient5}</p>
              <p>{cocktailData.drinks[0].strIngredient6}</p>
            </div>
            <img src={cocktailData.drinks[0].strDrinkThumb} alt="thumbnail" />
          </Card>
          :
          <><h2>-- Error no data --</h2></>
        }
    </Container>
  )
}
