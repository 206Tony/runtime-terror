import React from 'react';
import Favorite from './Favorite';
import { Link } from 'react-router-dom';
import Favorite from './Favorite';

export class DrinkAll extends React.Component {
  render() {
    return (
      <div>
        <div className="greetingbox">
          <p>Welcome to the app that allows you to browse various drinks and their recipies.</p>
        </div>
        <h3>ALL DRINKS</h3>
        {this.props.apiData && this.props.apiData.map(drink => (
          <div className="drinklist" onClick={() => this.props.handleDetailsClick(drink._id)}>
            <img className='drinkImg' src={drink.picture} style={{display: "block"}} />
            {/* <br /> */}
            <span className='caption' style={{display: "block"}}> 
              <Link to={`/${drink._id}`} 
                    style={{textDecoration: 'none',
                            color: 'black'}}>
                {drink.drinkName}
              </Link>
            </span>
            <Favorite  drink={drink} token={this.props.token} refreshUser={this.props.refreshUser} />
          </div>
        ))}
      </div>
    )
  }
}

export default DrinkAll;
