import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";


const client = new ApolloClient({uri: "http://localhost:8000/api/graph"});

ReactDOM.render(<BrowserRouter>
    <ApolloProvider client={client}>
        <Routes/>
    </ApolloProvider>
</BrowserRouter>, document.getElementById('root'));

