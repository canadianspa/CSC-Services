import React from "react";

import { Card, CardBody, CardLink, CardText, CardTitle, CardImg } from "reactstrap";

function Article({ article, index, onClick }) {
  function onLinkClick(event) {
    event.stopPropagation();
  }

  return (
    <Card key={index} onClick={() => onClick(article)}>
      <CardBody>
        <CardTitle tag="h5">{article.header}</CardTitle>
      </CardBody>
      <CardImg width="100%" src={article.homepageImg} alt={article.alt} />
      <CardBody>
        <CardText>{article.description}</CardText>
        <CardLink href={article.portalUrl} target="_blank" onClick={onLinkClick}>
          {article.portalTitle}
        </CardLink>
      </CardBody>
    </Card>
  );
}

export default Article;
