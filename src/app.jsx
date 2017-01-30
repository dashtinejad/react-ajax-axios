import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Repos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repos: []};
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/facebook/repos')
      .then(response => this.setState({ repos: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Repos by facebook</h1>
        {this.state.repos.map(repo =>
          <div key={repo.id}>{repo.name}</div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Repos />, document.getElementById('app'))