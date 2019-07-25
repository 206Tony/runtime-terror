import React from 'react';
import Favorite from './Favorite';
import { Link } from 'react-router-dom';

export class DrinkAll extends React.Component {
  render() {
    return (
      <div>
        <form action="/" method='GET'>
          <input type="text" name='text' placeholder='Type search request here...'/>
          <input type="submit" value='Search'/>
        </form>

        <h3>all the drinks</h3>
        {this.props.apiData && this.props.apiData.map(drink => (
        <div className="drinklist" onClick={() => this.props.handleDetailsClick(drink._id)}>
          <img className='drinkImg' src={drink.picture} style={{display: "block"}} />
          
          <br />
          <p style={{display: "block"}}> 
            <Link to={`/${drink._id}`}>{drink.drinkName}</Link>
          </p> 
        </div>
          ))}
      </div>
    )
  }
}

export default DrinkAll

