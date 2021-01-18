import React from "react";

import { Jumbotron, Header } from "./Shared";

function Homepage() {
  return (
    <div className="container">
      <Jumbotron>Welcome to Canadian Spa Services</Jumbotron>
      <Header>
        Guides to using this site can be found <a href="/guides">here.</a>
      </Header>
    </div>
  );
}

export default Homepage;
