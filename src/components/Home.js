import React, { PureComponent } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Table from "./Table";
import Footer from "./Footer";
import throttle from "lodash.throttle";
import { FaSearch } from "react-icons/fa";

// create a table for showing all the movies

class MovieTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movieDatas: [],
      search: "",
      error: false,
      dataLoaded: false,
      starsTotal: 5,
    };
    this.url = "http://3.120.96.16:3001/movies";

    this.source = undefined;
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.fetchData = throttle(this.fetchData.bind(this), 4000);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    axios
      .get(this.url, { cancelToken: this.source.token })
      .then(response => {
        let datas = response.data;
        this.setState({ movieDatas:datas, dataLoaded: true });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  // to store search input value in state
  onChangeSearch(e) {
    this.setState({ search: e.target.value });
  }

  // cancel axios
  componentWillUnmount() {
    this.source.cancel();
  }

  deleteMovie = id => {
    axios.delete("http://3.120.96.16:3001/movies/" + id).then(() => {
      this.fetchData();
    });
  };

  render() {
    const { movieDatas } = this.state;
    let renderContent;

    // to check if the request is bad then there is an error
    if (this.state.error) {
      return (
        <div className="container">
          <div className="center">
            <h1>404</h1>
            <p>PAGE NOT FOUND</p>
            <Link to="/" className="goBackLink">
              {`>> Back to Home <<`}
            </Link>
          </div>
        </div>
      );
    }

    if (this.state.dataLoaded) {
      // to check if there is any movie in the movieDatas array
      // if yes render table content, if not render no post yet
      renderContent = movieDatas.length ? (
        <Table {...this.state} deleteMovie={this.deleteMovie} />
      ) : (
        <div className="center">
          <p>No post yet</p>
        </div>
      );
    }

    return (
      <div className="container">
        <Helmet>
          <title>Home: MoviePedia</title>
        </Helmet>

        <div style={{ position: "relative" }}>
          {" "}
          {/*the position relative is for the search icon to be absolute */}
          <input
            className="searchInput"
            type="text"
            maxLength="40"
            placeholder="search by title or director"
            value={this.state.search}
            onChange={this.onChangeSearch}
          />
          <FaSearch
            color="darkGrey"
            style={{ position: "absolute", left: "25%", top: "35%" }}
          />
        </div>
        {renderContent}
        <Footer />
      </div>
    );
  }
}

export default MovieTable;
