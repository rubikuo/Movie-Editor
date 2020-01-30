import React, { Component } from "react";

export default class Form extends Component {
  render() {
    // to control warning message
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
      warningTitle = { color: "rgb(82, 223, 242)" };
      titleValidation = true;
    } else {
      warningTitle = { color: "rgb(245, 29, 26)" };
      titleValidation = false;
    }

    if (this.props.director.length >= 1 && this.props.director.length <= 40) {
      warningDirector = { color: "rgb(82, 223, 242)" };
      directorValidation = true;
    } else {
      warningDirector = { color: "rgb(245, 29, 26)" };
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
      warningRating = { color: "rgb(82, 223, 242)" };
      ratingValidation = true;
    } else if (this.props.rating === undefined) {
      warningRating = { color: "rgb(245, 29, 26)" };
      ratingValidation = false;
    } else {
      warningRating = { color: "rgb(245, 29, 26)" };
      ratingValidation = false;
    }

    if (
      this.props.description.length >= 1 &&
      this.props.description.length <= 300
    ) {
      warningDescription = { color: "rgb(82, 223, 242)" };
      descriptionValidation = true;
    } else {
      warningDescription = { color: "rgb(245, 29, 26)" };
      descriptionValidation = false;
    }

    // to check if all the input condition is true
    let warningMsg;
    if (
      titleValidation &&
      directorValidation &&
      ratingValidation &&
      descriptionValidation
    ) {
      warningMsg = null;
    } else if (this.props.error) {
      warningMsg = (
        <p className="warningMsg">Invalid input please check and try again!</p>
      );
    } else {
      warningMsg = null;
    }

    return (
      <>
        <form className="addForm" onSubmit={this.props.onSubmit}>
          <div className="formWrapDiv">
            <label htmlFor="name">
              {" "}
              {/*look for input field with id of Name and associate the label with input field */}
              Title
              <input
                type="text"
                value={this.props.title}
                id="title"
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
                value={this.props.director}
                id="director"
                placeholder="director"
                onChange={this.props.handleOnchange}
              />
              <span className="warning" style={warningDirector}>
                {this.props.director.length}/40
              </span>
            </label>
            <label htmlFor="name">
              Rating
              <input
                type="number"
                value={this.props.rating}
                id="rating"
                className="form-control"
                step={0.1}
                min={0}
                max={5}
                placeholder="0.0 - 5.0"
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
                className="descriptionCtn"
                value={this.props.description}
                placeholder="description"
                onChange={this.props.handleOnchange}
              ></textarea>
              <span className="warning" style={warningDescription}>
                {this.props.description.length}/300
              </span>
            </label>
          </div>
          <button id="updateBtn" type="submit">
            Submit
          </button>
        </form>
        {warningMsg}
      </>
    );
  }
}
