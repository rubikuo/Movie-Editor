import React, { Component } from "react";
class Form extends Component {
  render() {
    console.log(this.props);
    let warningTitle;
    let warningDirector;
    let warningRating;
    let ratingNum;
    let warningDescription;

    let titleValidation = false;
    let directorValidation = false;
    let ratingValidation = false;
    let descriptionValidation = false;

    if (this.props.title.length >= 1 && this.props.title.length <= 40) {
      warningTitle = { color: "blue" };
      titleValidation = true;
    } else {
      warningTitle = { color: "red" };
      titleValidation = false;
    }

    if (this.props.director.length >= 1 && this.props.director.length <= 40) {
      warningDirector = { color: "blue" };
      directorValidation = true;
    } else {
      warningDirector = { color: "red" };
      directorValidation = false;
    }

    if (this.props.rating === "") {
      ratingNum = 0;
    } else {
      ratingNum = parseFloat(this.props.rating);
    }

    if (
      parseFloat(this.props.rating) >= 0.0 &&
      parseFloat(this.props.rating) <= 5.0
    ) {
      warningRating = { color: "blue" };
      ratingValidation = true;
    } else if (this.props.rating === undefined) {
      warningRating = { color: "red" };
      ratingValidation = false;
    } else {
      warningRating = { color: "red" };
      ratingValidation = false;
    }

    if (
      this.props.description.length >= 1 &&
      this.props.description.length <= 300
    ) {
      warningDescription = { color: "blue" };
      descriptionValidation = true;
    } else {
      warningDescription = { color: "red" };
      descriptionValidation = false;
    }

    // to check if all the condition is true
    let warningMsg;
    if (
      titleValidation &&
      directorValidation &&
      ratingValidation &&
      descriptionValidation
    ) {
      warningMsg = null;
    } else if (this.props.error) {
      warningMsg = <p>"Oooppps Something is wrong"</p>;
    } else {
      warningMsg = null;
    }

    return (
      <>
        <form className="addForm" onSubmit={this.props.handleOnchange}>
          <div className="formWrapDiv">
            <label htmlFor="name">
              {" "}
              {/*look for input field with id of Name and associate the label with input field */}
              Title
              <input
                type="text"
                id="title"
                value={this.props.title}
                placeholder="title"
                onChange={this.props.handleOnchange}
              />
              <span className="warning" style={warningTitle}>
                {this.props.title.length}/40
              </span>
            </label>
            <label htmlFor="name">
              Director
              <input
                type="text"
                id="director"
                placeholder="director"
                onChange={this.props.handleOnchange}
                value={this.props.director}
              />
              <span className="warning" style={warningDirector}>
                {this.props.director.length}/40
              </span>
            </label>
            <label htmlFor="name">
              Rating
              <input
                type="number"
                id="rating"
                className="form-control"
                step={0.1}
                min={1}
                max={5}
                placeholder="0.0 - 5.0"
                value={this.props.rating}
                onChange={this.props.handleOnchange}
              />
              <span className="warning" style={warningRating}>
                {ratingNum}/5.0
              </span>
            </label>
            <label htmlFor="name">
              Description
              <textarea
                type="text"
                id="description"
                value={this.props.description}
                className="descriptionCtn"
                placeholder="description"
                onChange={this.props.handleOnchange}
              ></textarea>
              <span className="warning" style={warningDescription}>
                {this.props.description.length}/300
              </span>
            </label>
          </div>
          <button id="addBtn" type="submit">
            Add
          </button>
        </form>
        {warningMsg}
      </>
    );
  }
}

export default Form;
