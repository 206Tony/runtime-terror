import React from 'react';
import Favorite from './Favorite';
import Delete from './Delete';

function MyDranks(props) {
  return (
    <>
      <h3>MY FAVORITES</h3>
      { props.user && props.user.drinks.map( (drink, i) => (
        <div key={i}  className="favedescription">
          <div className="favedescriptionbox">
          <img src={drink.picture} alt="cocktail" className="singledrinkpic" style={{float: "left"}}/>
            <h3 className='drinkinstructions' style={{margin: "10px",
                                                padding: "15px",
                                                textTransform: "uppercase"}}>{drink.drinkName} is a {drink.category} served in a {drink.glassType}</h3>
            <h4 style={{textAlign: 'left'}}>{drink.instructions}</h4>
            {/* <Favorite drink={drink} token={props.token} refreshUser={props.refreshUser}/> */}
          </div>
          <Delete  drink={drink} token={props.token} refreshUser={props.refreshUser} />
      </div>
      ))}
  </> 
  )
}
export default MyDranks;

