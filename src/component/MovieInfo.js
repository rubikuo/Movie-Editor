import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Movie from "./movie.png";
import { Redirect, Link } from "react-router-dom";
import MaterialIcon from "material-icons-react";
// this is rendered by clicking a movie in the movie table

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { moive: [], id: null, redirect: false };

    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ id: id });

    this.timer = setInterval(() => {
      axios.get("http://3.120.96.16:3001/movies/" + id).then(response => {
        console.log(response);
        this.setState({ movie: response.data });
      });
    }, 1000);
  }



  componentWillUnmount() {
    clearInterval(this.timer);
  }

  deleteMovie() {
    const id = this.props.match.params.id;
    axios.delete("http://3.120.96.16:3001/movies/" + id).then(() => {
        this.setState({redirect:true})
    });
  };

  render() {
      let id = this.props.match.params.id;
    const editUrl = "/edit-movies/" + id;
    if(this.state.redirect){
      return <Redirect to="/" />;
    }
    const movie = this.state.movie ? (
 
      <div >
        <Helmet>
          <title>{this.state.movie.title}</title>
        </Helmet>
        <div className="eachMovieInfo">
          {" "}
           <Link to={editUrl} style={{ width: "2rem" }}>
           <MaterialIcon icon="edit" />
           </Link>

           <button
                className="deleteBtn"
                onClick={() => this.deleteMovie()}
              >
                <MaterialIcon icon="delete_forever" />
              </button>
          <div className="imgCtn">
            <img src={Movie} alt="MovieImg" className="movieImg" />
          </div>
          <div className="movieTitleCtn">
            <h1>{this.state.movie.title}</h1>
            <h3>{this.state.movie.director}</h3>
          </div>
          <p>{this.state.movie.description}</p>
        </div>
      </div>
    ) : (
      <div className="center"> Loading ... </div>
    );

    return <div className="container">{movie}</div>;
  }
}

export default MovieInfo;
