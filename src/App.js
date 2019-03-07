import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import getAllAgents from "./getAllAgents.js";

const client = new ApolloClient({uri: "http://localhost:8000/api/graph"});

const GetAllAgents = getAllAgents(({ agent, loading, error}) => {
    console.log("Running");

    if (loading) {
        console.log("LOADING");

        return(
            <strong>Loading...</strong>
        );
    } else if (error) {
        console.log("ERROR");

        return(
            <p style={{color: "#F00"}}>API error</p>
        );
    } else {
        console.log("SUCCESS");
        console.log(agent);

        return(
            <div>
                <p>Check for agent list in console</p>
            </div>
        );
    }
});


class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
        <GetAllAgents/>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
        </ApolloProvider>
    );
  }
}

export default App;
