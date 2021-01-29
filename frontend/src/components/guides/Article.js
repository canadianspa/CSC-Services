import React from "react";
import styles from "./GuidesPage.module.css";

import { Card, CardBody, CardLink, CardText, CardTitle, CardImg } from "reactstrap";

function Article({ article, onClick }) {
  const { header, homepageImg, alt, description, portalTitle, portalUrl } = article;

  function onLinkClick(event) {
    event.stopPropagation();
  }

  return (
    <Card className={styles.card} onClick={() => onClick(article)}>
      <CardBody>
        <CardTitle tag="h5">{header}</CardTitle>
      </CardBody>
      <CardImg width="100%" src={homepageImg} alt={alt} />
      <CardBody>
        <CardText>{description}</CardText>
        <CardLink href={portalUrl} target="_blank" onClick={onLinkClick}>
          {portalTitle}
        </CardLink>
      </CardBody>
    </Card>
  );
}

export default Article;
