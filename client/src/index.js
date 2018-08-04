import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession';
import Navbar from './components/Navbar';
import Profile from './components/Profile/Profile';
import Promotion from './components/Promotion/Promotion';
import AddPromotion from './components/Promotion/AddPromotion';
import PromotionPage from './components/Promotion/PromotionPage';
import AddAbout from './components/About/AddAbout';

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({ networkError }) => {
        if (networkError) {
            console.log('Network Error', networkError);
            // if (networkError.statusCode === 401) {
            //     localStorage.setItem('token', '');
            // }
        }
    }
});


const Root = ({ refetch, session }) => (
    <Router>
        <Fragment>
            <Navbar session={session} />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" render={() => <Signin refetch={refetch} />} />
                <Route path="/signup" render={() => <Signup refetch={refetch} />} />
                <Route path="/about/add" render={() => <AddAbout session={session} />} />
                <Route path="/profile"  render={() => <Profile session={session} />} />
                <Route path="/promotions" exact component={Promotion} />
                <Route path="/promotions/add" render={() => <AddPromotion session={session} />} />
                <Route path="/promotions/:_id" component={PromotionPage} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>,
    document.getElementById('root')
);
registerServiceWorker();
