import React from 'react';
import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux';
import {
    withRouter,
    BrowserRouter as Router,
    Route, 
    Link, 
    Switch, 
    Redirect
} from "react-router-dom";
import Home from './page/Home'
import Questions from './page/Questions.jsx';
import AddNewQuestion from './page/AddNewQuestion.jsx';
import Header from './components/Header.jsx';
import QuestionsList from './page/QuestionsList.jsx';
import ModalWindow from './components/modal/ModalWindow';

const modalWindow = document.getElementById('modal-window')

function App() {
    const modal = useSelector((state) => state.modal.value)

    return (
        <div>
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
            <div>
            {!modal && ReactDOM.createPortal(
                <ModalWindow />,
                modalWindow
            )}
            </div>
        </div>
    )
}

export default withRouter(App)