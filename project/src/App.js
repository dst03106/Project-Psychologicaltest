import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useCallback, useReducer } from "react";
import StartPage from "./pages/Test/Start";
import Completed from "./pages/Completed";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Test from "./pages/Test";
import Result from "./pages/Result";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <StartPage />
          </Route>

          <Route path="/test">
            <Test />
          </Route>

          <Route path="/completed">
            <Completed />
          </Route>

          <Route path="/result">
            <Result />
          </Route>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
