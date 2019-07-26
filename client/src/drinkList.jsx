import React from 'react';
//import axios from 'axios';
//import DrinkFaves from './DrinkFaves';


const DrinkList = (props) => {
  const drinks = props.drinks ? props.drinks : [];

  return (
    <div>
      {drinks.drinkName}
    </div>
  )
}

export default DrinkList;

