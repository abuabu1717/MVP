import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parks: []
    }
  }


  componentDidMount() {
    $.ajax({
      url: '/parks',
      success: (data) => {
        this.setState({
          parks: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }


  search (term) {
    console.log(`Searched for ${term}`);
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:5000/parks/import",
      data: { term: term },
      success : (result) => {
        console.log('Success!');
        this.setState({
          parks: result
        })
      },
      error: function(error) {
        alert(error);
      }
    });
  }

  render () {
    return (
      <div>
        <h1>National Park Search</h1>
        <Search onSearch={this.search.bind(this)}/>
        <List parks={this.state.parks} />
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
