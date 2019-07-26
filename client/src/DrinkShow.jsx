import React from 'react';
const DrinkShow = (props) => {
  const ingredients = props.drink.ingredients ? props.drink.ingredients: [];
  const ingredientItems = ingredients.map((ingredient, i) => {
    return(
    <p key={i}>
      {ingredient. measure}
      {ingredient.ingredient}
    </p>
    )
  })
  return (
    <>
      <div className="greetingbox">
        <h3 style={{textTransform: 'uppercase'}}>{props.drink.drinkName}</h3>
        <h5>This tasty {/*props.drink.category*/}drink is usually served in a(n) {props.drink.glassType}</h5>
      </div>
      <div className='drink-show'>
        <img src={props.drink.picture} className="singledrinkpic"/>
        <div className="descriptionbox">
          <img src="https://images.unsplash.com/photo-1530034424313-9be028eeae5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80" id="drunkperson"/>
          <div className="descriptionboxtext">
            <h3 className='drinkinstructions'>To make this cocktail:</h3>
            <h4 style={{fontSize: "14px"}}>{props.drink.instructions}</h4>
            <h3 className='drinkinstructions'>Ingredients:</h3>
            <h4 class="indiv-ingred">{ingredientItems}</h4> 
          </div>  
        </div>
    </div>
    </>
  )
  
}
export default DrinkShow;