import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      likes: 0
    }
    //this.baseState.likes = this.state.likes;
  }

  onChange(event) {
    this.setState({
      term: event.target.value,
    })
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render () {
    return (
      <div className ="search-bar">
        <h4>Search for a national park!</h4>
        Enter a city or zip code: <input value={this.state.term} onChange={this.onChange.bind(this)}/>
        <button className="btn" onClick={this.search.bind(this)}>
          <span className="glyphicon glyphicon-search">  Search National Parks
          </span>
        </button>
      </div>)
  }
}

export default Search;
