import React, { PureComponent } from "react";

export default class Footer extends PureComponent {
  render() {
    console.log("render footer");
    return (
      <>
        <footer className="footer">&copy; Ju-I Kuo(Rubi) | January 2020</footer>
      </>
    );
  }
}
