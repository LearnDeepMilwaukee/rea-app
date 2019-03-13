import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import configureStore from "./redux/store/configureStore";
import {Provider} from 'react-redux';

const store = configureStore();


const client = new ApolloClient({uri: "http://localhost:8000/api/graph"});

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <ApolloProvider client={client}>
            <Routes/>
        </ApolloProvider>
    </Provider>

</BrowserRouter>, document.getElementById('root'));

