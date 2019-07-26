import React from 'react';
import axios from 'axios';
import Filter from './Filter';
import DrinkList from './DrinkList';
// import Drinks from 'Drinks';
import './App.css';
import DrinkShow from './DrinkShow';
import DrinkAll from './DrinkAll';
import MyDranks from './MyDranks';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Favorite from './Favorite';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null,
      current: {},
      filterValue: 'vodka'
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
    this.handleDetailsClick = this.handleDetailsClick.bind(this)
    this.displayAllDrinks = this.displayAllDrinks.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    //this.filterApiData = this.filterApiData.bind(this)
  }

  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // Token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // Token is found in local storage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user,
              errorMessage: ''
            }, this.displayAllDrinks)
          }
        })
    }
  }

  handleDetailsClick(drinkId) {
    // console.log('fetching details for:', drinkId);
    const url = '/api/drinks/' + drinkId;
    // console.log("url is: ",url);
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get(url, config).then(result => {
      // console.log(result)
      this.setState({
        current: result.data
      })
    })
  }
  // handleClick(e) {
  //   e.preventDefault()
    // axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`
  //   let config = {
  //     headers: {
  //       Authorization: `Bearer ${this.state.token}`
  //     }
  //   }
  //   axios.get('/locked/test', config).then( res => {
  //     console.log("this is the locked response:", res)
  //     this.setState({
  //       lockedResult: res.data
  //     })
  //   })
  // }

  liftToken({token, user}) {
    this.setState({
      // can use token: token, OR just
      token,
      user
    })
  }

  logout() {
    // Remove token from local storage
    localStorage.removeItem('mernToken');
    // Remove user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  componentDidMount() {
    this.checkForLocalToken()
  }

  displayAllDrinks(e) {
    //e.preventDefault()
    //setTimeout(() => {
      let config = {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }
      // console.log('config is: ', config)
      // console.log('attempting axios call')
      axios.get('/api/drinks', config).then( result => {
        // console.log("this is the api response: ", result)
        this.setState({
          apiData: result.data
        })
        // console.log("result is: ", result)
      })
     //}, 1000)
  }

  showFavoriteDrinks() {
    //e.preventDefault()
    let config = {
        headers: {
            Authorization: `Bearer ${this.state.token}`
        }
    }
    console.log('config is: ', config)
    console.log('attempting axios call')
        axios.get('/api/drinks', config).then( result => {
        console.log("this is the api response: ", result)
        this.setState({
            favoriteDrinks: result.data
        })
        console.log("result is: ", result.data)
    })
}

handleFilterChange(e) {
  e.preventDefault();
  const filterValue = e.target.value;
  this.setState({
    filterValue // same as filterValue: filterValue
  })
}

  render() {
    var user = this.state.user
    // console.log("user is: ",user)
    var contents = '';
    var current = this.state.current;
    const dataCopy = Object.assign({}, this.state.apiData)
    // var filteredDrinks = this.state.apiData.filter(data => {
    //   return data.ingredients 
    // })
    // .map(ingredient => {
    //   return data.ingredient
    // })
    //   return value.toLowerCase().includes(dataCopy.filterValue.toLowerCase())//ingredient === 'vodka'
    //   //return fruit.toLowerCase().includes(this.state.filterValue.toLowerCase())
    // })
    // const filteredIngredients = filteredDrinks.map((drink, i) => {
    //   return <p key={i}>{drink.attribute.ingredient}</p>
    // }
    //console.log("copied data: ", dataCopy)
    // console.log("this is state", this.state);
    //const listCopy = Array.from(this.state.apiData);
    //const filteredList = listCopy.filter(drink => {
      //return drink.toLowerCase().includes(this.state.filterValue.toLowerCase()) 
    //})

    // const newFilterApiData = {};
    // function filterApiData(keys, obj)  {
    //   for (let key in obj) {
    //     if (keys.includes(key)) {
    //       newFilterApiData[key] = obj[key];
    //     }
    //   }
    //     return newFilterApiData;
    //   // this.setState({
    //   //   newFilterApiData
    //   // })
    // }

    // function getSearchResult(filterBy, objList) {
    //   return objList.highlights.filter(function(obj) {
    //     return obj.queries.some(function(item) {
    //       return item.indexOf(filterBy) >= 0
    //     })
    //   })
    // }
    
    if (user) {
      contents = (
        <>
          <nav>
            <Link to='/' style={{textDecoration: 'none',
                          color: 'white',
                          margin: '5px',
                          padding: '5px',
                          float: 'left',}}>HOME{' '} </Link>
            <Link to={`/favorites/${user._id}`} style={{textDecoration: 'none',
                          color: 'white',
                          margin: '5px',
                          padding: '5px',
                          float: 'left',}}>FAVORITES</Link>
            <p onClick={this.logout} style={{position: "inline-block",
                                            color: 'white',
                                            float: "right",
                                            margin: '5px',
                                            padding: '5px'}}>LOGOUT
            </p>
          </nav>
          <div className="greetingbox">  
            <h3 className="greeting">Hello, {user.name}!</h3>
            {/* <p onClick={this.logout} style={{}}>LOGOUT</p> */}
            {/* <form>
              <input type="text" name='text' placeholder='Type search request here...'/>
              <input type="submit" value='Search'/>
            </form> */}
          </div>
          <div>
            <Route exact path='/' render={ props => <DrinkAll  apiData={this.state.apiData} 
                                                              token={this.state.token} 
                                                              refreshUser={this.checkForLocalToken} 
                                                              handleDetailsClick={this.handleDetailsClick} {...props} />}/>            
            <Route exact path='/:id' render={ props => <DrinkShow drink={current} {...props} />}/>  
            <Route exact path='/favorites/:id' render={ props => <MyDranks 
                                              user={user} 
                                              apiData={this.state.apiData} 
                                              token={this.state.token} 
                                              refreshUser={this.checkForLocalToken} 
                                              handleDetailsClick={this.handleDetailsClick} {...props} />}/>          
          </div>
              {/* { {this.state.apiData && this.state.apiData.map(drink => (
                <div className="drinklist" onClick={() => this.handleDetailsClick(drink._id)}>
                  <img className='drinkImg' src={drink.picture} style={{display: "block"}} />
                  <br />
                  <Favorite  drink={this.state.current} token={this.state.token} refreshUser={this.state.refreshUser}/>
                  <p style={{display: "block"}}> 
                    {drink.drinkName}
                  </p> 
                </div>
              ))} */}

        </>
      )
    } else {
      contents = (
        <>
          <p>Please signup or login...</p>
          <Login liftToken={this.liftToken} />
          <Signup liftToken={this.liftToken} />
        </>
      );
    }

    return (
      <Router>
        {contents}
      </Router>
      
    )
  }
}

export default App;