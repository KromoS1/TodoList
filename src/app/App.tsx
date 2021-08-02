import React from 'react';
import './App.css';
import {TodoPage} from '../components/todolist/TodoListContainer';
import {Route, Switch} from "react-router-dom";
import {LoginPage} from "../components/Login/Login";

export function App() {
    return (
        <Switch>
            <Route path={"/todolists"} component={TodoPage}/>
            <Route path={"/login"} component={LoginPage}/>
        </Switch>
)

}

