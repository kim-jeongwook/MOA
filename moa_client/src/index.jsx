import React from "react";

import ReactDOM from "react-dom";

import dotenv from "dotenv";

import { createStore } from "redux";

import { Provider } from "react-redux";

import Reducer from "./redux/reducer";

import Navigation from "./nav/Navigation";

import MainPage from "./MainPage";

// bootstrap 사용을 위해 bootstrap.min.css import
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
=======

import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> c51dd9aed68088c8d0bc72ff22ac1a2d1ac267c1

const store = createStore(Reducer);

dotenv.config({ path: "../.env" });

ReactDOM.render(
  <Provider store={store}>
    ​ <Navigation />
    ​ <MainPage />
  </Provider>,

  document.querySelector("#Root")
);
