import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MovieTable from "./component/MovieTable";
import AddMovie from "./component/AddMovie";
import EditMovie from "./component/EditMovie";
import MovieInfo from "./component/MovieInfo";
import Navigation from "./component/Navigation";



// routes will be here

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={MovieTable}></Route>
        <Route path="/add-movies" component={AddMovie}></Route>
        <Route path="/edit-movies/:id" component={EditMovie}></Route>
        <Route path="/movie-info/:id" component={MovieInfo}></Route>
        </Switch>
      </Router>
     

    </div>
  );
}

export default App;
