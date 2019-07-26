import React from 'react';

const Filter = (props) => (
  <input type="text" 
          name="filter" 
          placeholder="Filter the drinks..."
          value={props.value}
          onChange={props.onChange} 
  />
)

export default Filter;