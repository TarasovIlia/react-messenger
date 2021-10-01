import React from 'react';
import {
    Router,
    Route, 
    Link, 
    Switch, 
    Redirect
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Home from './Home'
import Questions from './Questions.jsx';
import AddNewQuestion from './AddNewQuestion.jsx';
import Header from './Header.jsx';
import QuestionsList from './QuestionsList.jsx';

export default function App() {
    const history = createBrowserHistory()
    return (
        <Router history={history}>
            <Header />
            <div className='main-wrapper'>
                <div className='content'>
                    <Switch>
                        <Route exact={true} history={history} path='/'>
                            <Home />
                        </Route>
                        <Route history={history} path='/all'>
                            <Questions />
                        </Route>
                        <Route history={history} path='/addnew'>
                            <AddNewQuestion />
                        </Route>
                        <Route history={history} path='/questions'>
                            <QuestionsList />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
