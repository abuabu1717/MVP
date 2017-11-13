import React from 'react';
import $ from 'jquery';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0
    };
//    this.onClick = this.onClick.bind(this);
    this.updateLikes = this.updateLikes.bind(this);
  }

  updateLikes(event) {
    this.state.likes++
     console.log('updated likes to ' + this.state.likes);
     //this.updateDB();
     $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/parks/updatedb",
      data: {
        name: this.props.park[0].name,
        address: this.props.park[0].vicinity,
        location: this.props.park[0].loc,
        likes: this.state.likes
      },
      success : (result) => {
        console.log('updatedb successfully');
      },
      error: function(error) {
        alert(error);
      }
    });
    this.setState({
      likes: this.state.likes
    })
  }

  render () {
    return (<div id="list-item">
      <div id="park-name">{ this.props.park[0].name }</div>
      <div id="park-likes"> { this.state.likes } likes </div>
      <div>{ this.props.park[0].vicinity }</div>
      <div>{ this.props.park[0].loc }</div>

      <button onClick={this.updateLikes}>
        <span className="glyphicon glyphicon-thumbs-up">Like</span>
      </button>

    </div>)
  }
}

export default ListItem;
