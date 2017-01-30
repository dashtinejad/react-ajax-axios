import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Repos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {repos: []};
  }

	fetchRepos() {
		axios.get(`https://api.github.com/users/${this.props.username}/repos`)
      .then(response => this.setState({ repos: response.data }))
      .catch(error => console.log(error));
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
