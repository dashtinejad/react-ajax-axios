import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Repos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repos: []};
  }

  fetchRepos() {
    // cancel the previous request
    if (typeof this._source != typeof undefined) {
      this._source.cancel('Operation canceled due to new request.')
    }

    // save the new request for cancellation
    this._source = axios.CancelToken.source();
    
    axios.get(`https://api.github.com/users/${this.props.username}/repos`,
      // cancel token used by axios
      { cancelToken: this._source.token }
    )
      .then(response => this.setState({ repos: response.data }))
      .catch(error => {
         if (axios.isCancel(error)) {
           console.log('Request canceled', error);
         } else {
           console.log(error);
         }
      });
  }

  componentDidMount() {
    this.fetchRepos();
  }

  componentDidUpdate(prevProps) {
    if (this.props.username != prevProps.username) {
      this.fetchRepos();
    }
  }

  render() {
    return (
      <div>
        <h1>Repos by {this.props.username}</h1>
        {this.state.repos.map(repo =>
          <div key={repo.id}>{repo.name}</div>
        )}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: 'facebook'};
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({username: 'facebook'})}>Facebook</button>
        <button onClick={() => this.setState({username: 'microsoft'})}>Microsoft</button>
        <button onClick={() => this.setState({username: 'google'})}>Google</button>

        <Repos username={this.state.username} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
