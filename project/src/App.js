import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Test from "./pages/Test";
import Start from "./pages/Start";
import Result from "./pages/Result";
import Completed from "./pages/Completed";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Start />
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
