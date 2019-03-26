import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes.js';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import configureStore from "./redux/store/configureStore";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

let storeAndPersistor =configureStore();
const store = storeAndPersistor.store;
const persistor = storeAndPersistor.persistor;


const client = new ApolloClient({uri: "http://localhost:8000/api/graph"});

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
              <Routes/>
            </ApolloProvider>
        </PersistGate>
    </Provider>

</BrowserRouter>, document.getElementById('root'));

