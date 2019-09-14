import React from 'react';
import axios from 'axios';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    isFav: []
    }
    this.handleFavorite = this.handleFavorite.bind(this);
  }
    
  handleFavorite(e, drink) {
    e.preventDefault();
      //const newFaves = this.state.isFav.slice()
      // const drinkIndex = newFaves.indexOf(drink);
    const current = this.props.drink;
    // const user = this.props.user;
    let config = {
      headers: {
        Authorization: `Bearer ${this.props.token}`
    }
  }
    axios.post('/api/drinks', current, config)
      .then( (response) => {
        this.props.refreshUser()
    })
    console.log(current)
  }

  displayFavorite(e) {
    e.preventDefault()
    axios.get('/api/drinks', )
  }
    
  render() {
    return(
    <div className="fav">
      <button className="favbutton"  onClick={this.handleFavorite} type='button'>
        <span style={{fontSize: '20px',
                        pposition: "absolute",
                        top: "50%",
                        left: "50%",
                        color: "rgb(43, 45, 47)"}}>+
        </span>
      </button>
    </div>
    )
  }
}

export default Favorite;
