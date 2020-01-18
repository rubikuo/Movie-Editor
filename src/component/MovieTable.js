import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faStar} from "@fortawesome/free-solid-svg-icons";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import MaterialIcon from "material-icons-react";
import Movie from "./movie.png";

// create a table for showing all the movies

class MovieTable extends Component {
  constructor(props) {
    super(props);
    this.state = { movieDatas: [], updateData: [] };
    this.url = "http://3.120.96.16:3001/movies";
    // this.deleteMovie = this.deleteMovie.bind(this);
    // this.fetchAfterDelete = this.fetchAfterDelete.bind(this);
    // this.fetchData = this.fetchData.bind(this);
    this.starsTotal = 5;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get(this.url).then(response => {
      // console.log(response.data);
      let datas = response.data;
      this.setState({ movieDatas: datas });
    });
  };

  componentDidUpdate = () => {
    let historyData = this.state.movieDatas;
    let newData;
    axios
      .get(this.url)
      .then(res => {
        this.setState({ updateData: res.data });
        newData = this.state.updateData;
        return newData;
      })
      .then(result => {
        console.log("histroyData", historyData);
        console.log("newData", result);
        // if(historyData[-1].id !== newData[-1].id){
        //   this.setState({movieDatas: result});
        // }
      });
  };

  componentWillUnmount() {}

  // fetchAfterDelete() {
  //   var CancelToken = axios.CancelToken;
  //   var source = CancelToken.source();
  //   axios
  //     .get(this.url, {
  //       cancelToken: source.token
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       let datas = response.data;
  //       this.setState({ movieDatas: datas });
  //     })
  //     .catch(function(thrown) {
  //       if (axios.isCancel(thrown)) {
  //         console.log("Request canceled", thrown.message);
  //       } else {
  //         // handle error
  //       }
  //     });
  //     source.cancel("Operation canceled by the user");
  // }

  deleteMovie = id => {
    axios.delete("http://3.120.96.16:3001/movies/" + id).then(() => {
      this.fetchData();
    });
  };

  render() {
    const { movieDatas } = this.state;
    const renderTbody = movieDatas.length ? (
      movieDatas.map(movie => {
        const editUrl = "/edit-movies/" + movie.id;
        const infoUrl = "/movie-info/" + movie.id;
        // //get percentage
        // const startPercentage = (movie.rating / this.starsTotal) *100;

        // //Round to nearest 10
        // const starPercentageRounded = `${Math.round(startPercentage /10) * 10 } %`;

        // console.log(starPercentageRounded);

        return (
          <tr key={movie.id}>
            {/* <td> <MaterialIcon className="movieIcon" icon="local_movies" /></td> */}
            <td>
              <img src={Movie} alt="movieImg" className="movieImg" />
            </td>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            <td>
              <div className="stars-outer">
                <div
                  className="stars-inner"
                  style={{
                    width: `${Math.round(
                      ((movie.rating / this.starsTotal) * 100) / 10
                    ) * 10}%`
                  }}
                ></div>
              </div>
              <span className="number-rating"></span>
            </td>
            <td>
              <span>
                <button
                  className="deleteBtn"
                  onClick={() => this.deleteMovie(movie.id)}
                >
                  <MaterialIcon icon="delete_forever" />
                </button>
              </span>
              <span>
                {" "}
                <Link to={editUrl}>
                  <MaterialIcon icon="edit" />
                </Link>
              </span>
              <span>
                {" "}
                <Link to={infoUrl}>Info</Link>{" "}
              </span>
            </td>
          </tr>
        );
      })
    ) : (
      <div className="center"> No Post Yet </div>
    );
    return (
      <div className="moviesDiv">
        <div>
          <Helmet>
            <title>Home: MoviePedia</title>
          </Helmet>
        </div>
        <div className="tableCtn">
          <div className="tableHeader" style={{ fontSize: "3rem" }}>
            MoviePedia
          </div>
          <table cellspacing="0">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Director</th>
                <th>Rating</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderTbody}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MovieTable;
