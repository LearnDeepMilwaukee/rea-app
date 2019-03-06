import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
const client = new ApolloClient({uri: "http://localhost:8000/api/graph"});

client.query({
    query: gql`
    query{
  viewer(token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbm5vciIsImlhdCI6MTU1MTg0ODI3MSwicGFzc3dvcmQiOiI3YzA4ODliOWU5ZmNjYzAxZDIzMDcwNzljNDk5OTcyNDFlNTZlNzU0IiwiaWQiOjZ9.unIuk6g8HcmyIuF1sONrLAiftApTlcuqMWWLO6DtqUQ"){
    allAgents{
      name
    }
  }
}
    `
}).then(result => console.log(result.data.viewer.allAgents));
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
