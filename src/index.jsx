import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import { FirebaseContextProvider } from './context/FirebaseContext';
import * as serviceWorker from './serviceWorker';

const LandingPage = () => (
    <FirebaseContextProvider>
        <AuthContextProvider>
        <App/>
        </AuthContextProvider>
    </FirebaseContextProvider>
)

// ReactDOM.render(<LandingPage />, document.getElementById('root'));

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<LandingPage />, rootElement);
} else {
  ReactDOM.render(<LandingPage />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
