import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { Home } from '../Components/Home';

import '../_styles/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="mainContainer">
                        <Router history={history}>
                            <div>
                                <Route exact path="/" component={Home} key="default-project" />
                                <Route path="/:name" component={Home} key="selected-project" />
                            </div>
                        </Router>
                    </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 

{/* <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} /> */}