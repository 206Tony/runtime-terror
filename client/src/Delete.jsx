import React from 'react';
import axios from 'axios';

class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        isFav: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete(e, drink) {
        e.preventDefault();
        const beverage = this.props.drink;
        console.log(this.props.token)
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.delete('/api/drinks/'+beverage._id, config)
            .then( (response) => {
                //! we have to fix this line below
                this.props.refreshUser()
            })
        console.log('drink is: ', beverage)
    }
    
    render() {
        return(
            <div className="fav">
                <button className="favbutton"  onClick={this.handleDelete} type='button'>
                    <span style={{fontSize: '20px',
                                    pposition: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    color: "rgb(43, 45, 47)"}}>-
                    </span>
                </button>
            </div>
        )
    }
}

export default Delete;
