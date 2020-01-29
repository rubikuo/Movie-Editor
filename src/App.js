import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/Home";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import MovieInfo from "./components/MovieInfo";
import Navigation from "./components/Navigation";


// routes will be here

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/add-movies" component={AddMovie}></Route>
          <Route path="/edit-movies/:id" component={EditMovie}></Route>{" "}
          {/* the (: colon here is to define after slash (/) can be anything and here we want to put an id...so if without (:) then the url will only read when we write "id" as exact word) */}
          <Route path="/movie-info/:id" component={MovieInfo}></Route>
        </Switch>
       
      </Router>
    </div>
  );
}

export default App;
