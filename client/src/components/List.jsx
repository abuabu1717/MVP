import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
}

  render () {
    return (<div id="park-list">
      Found {this.props.parks.length} National Parks.
      { this.props.parks.map((park, index) => <ListItem park={[park]} key={index}/>)}
    </div>)
  }
}

export default List;
