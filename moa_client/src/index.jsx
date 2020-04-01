import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./redux/reducer";

import Navigation from "./nav/Navigation";
import MainPage from "./MainPage";

// bootstrap 사용을 위해 bootstrap.min.css import
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(Reducer);

ReactDOM.render(
    <Provider store={store}>
        <Navigation />
        <MainPage />
    </Provider>
    ,
    document.querySelector("#Root")
);