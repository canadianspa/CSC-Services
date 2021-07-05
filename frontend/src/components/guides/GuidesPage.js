import React, { useState, useEffect } from "react";
import styles from "./GuidesPage.module.css";

import { Jumbotron } from "../Shared";
import GuidesPageModal from "./GuidesPageModal";
import Article from "./Article";
import loadArticles from "./Articles";

function GuidesPage({ match, history }) {
  const articles = loadArticles();

  const [isOpen, setIsOpen] = useState(false);
  const [article, setArticle] = useState(articles[0]);

  useEffect(() => {
    if (match.params.article) {
      var loadArticle = articles.find((article) => {
        return article.alt === match.params.article;
      });

      if (loadArticle) {
        setArticle(loadArticle);
        setIsOpen(true);
      }
    }
    // eslint-disable-next-line
  }, []);

  function toggle() {
    if (isOpen === true && match.params.article) {
      history.push("/guides");
    }

    setIsOpen(!isOpen);
  }

  function onArticleClick(article) {
    setArticle(article);
    toggle();
  }

  return (
    <>
      <Jumbotron>Guides</Jumbotron>
      <div className={styles.articleContainer}>
        {articles.map((article, index) => (
          <Article key={index} article={article} onClick={onArticleClick} />
        ))}
      </div>
      <GuidesPageModal isOpen={isOpen} toggle={toggle} article={article} />
    </>
  );
}

export default GuidesPage;
