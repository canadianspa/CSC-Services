import React, { useState, useEffect } from "react";
import "./GuidesPage.css";

import { Jumbotron } from "../Shared";
import GuidesPageModal from "./GuidesPageModal";
import Article from "./Article";
import loadArticles from "./Articles";

function HelpPage({ match, history }) {
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
  }, [match]);

  function toggle() {
    if (isOpen === true && match.params.article) {
      alert("ere");
      history.push("/guides");
    }

    setIsOpen(!isOpen);
  }

  function onArticleClick(article) {
    setArticle(article);
    toggle();
  }

  return (
    <div className="container">
      <Jumbotron>Guides</Jumbotron>
      <div className="article-container">
        {articles.map((article, index) => (
          <Article key={index} article={article} onClick={onArticleClick} />
        ))}
      </div>
      <GuidesPageModal isOpen={isOpen} toggle={toggle} article={article} />
    </div>
  );
}

export default HelpPage;
