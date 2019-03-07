import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import OrganizationCatalog from './pages/OrganizationCatalog.js';
import BasicTextPage from './pages/BasicTextPage.js';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={OrganizationCatalog}/>
                    <Route exact path="/text" component={BasicTextPage}/>
                </Switch>

            </div>

        );
    }
}

export default App;
