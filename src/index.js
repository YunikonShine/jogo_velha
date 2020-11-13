import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Ranking from "./views/ranking/Ranking";
import Game from "./views/game/Game";

ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" render={() => <Ranking></Ranking>}></Route>
    <Route exact path="/game" render={() => <Game></Game>}></Route>
  </BrowserRouter>,
  document.getElementById("root")
);
