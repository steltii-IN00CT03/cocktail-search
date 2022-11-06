import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card, InputGroup, Button, FormControl, ListGroup} from 'react-bootstrap';

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
    <Container fluid='xl' style={{ width: '50%' }}>
        <div id="search_form">
          <h1>Cocktail Search</h1>
          <InputGroup className='mb-3' size='1g'>
            <FormControl
              placeholder='Search for a cocktail'
              type='input'
              onKeyPress={e =>{
                if(e.key == "Enter"){searchForCocktail(e)}}}
              onChange={e => setSearchText(e.target.value)}
            />
            <Button onClick={e => searchForCocktail(e)}>
              Search
            </Button>
          </InputGroup>
        </div>
        {JSON.stringify(cocktailData) != '{}' ?
          <Card style={{ width: '100%'}}>
            <Card.Body>
              <Card.Title>{cocktailData.drinks[0].strDrink}</Card.Title>
              <Card.Subtitle>Glass</Card.Subtitle>
              <Card.Text>{cocktailData.drinks[0].strGlass}</Card.Text>
              <Card.Subtitle>Instructions</Card.Subtitle>
              <Card.Text>{cocktailData.drinks[0].strInstructions}</Card.Text>
              <Card.Header style={{ width: '50%'}}>Ingredients</Card.Header>
              <ListGroup style={{ width: '50%'}}>
                <ListGroup.Item>{cocktailData.drinks[0].strIngredient1}</ListGroup.Item>
                <ListGroup.Item>{cocktailData.drinks[0].strIngredient2}</ListGroup.Item>
                <ListGroup.Item>{cocktailData.drinks[0].strIngredient3}</ListGroup.Item>
                <ListGroup.Item>{cocktailData.drinks[0].strIngredient4}</ListGroup.Item>
                <ListGroup.Item>{cocktailData.drinks[0].strIngredient5}</ListGroup.Item>
                <ListGroup.Item>{cocktailData.drinks[0].strIngredient6}</ListGroup.Item>
              </ListGroup>
              <Card.Img src={cocktailData.drinks[0].strDrinkThumb} alt="thumbnail" />
            </Card.Body>
          </Card>
          :
          <><h2>-- Error no data --</h2></>
        }
    </Container>
  )
}
