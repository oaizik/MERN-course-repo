import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/mainView/MainView';


export default function App() {

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Main />
            </div>
        </div>
    );
};