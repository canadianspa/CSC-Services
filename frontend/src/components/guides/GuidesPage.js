import React, { useState } from "react";
import "./GuidesPage.css";

import { Jumbotron } from "../Shared";
import GuidesPageModal from "./GuidesPageModal";
import Article from "./Article";
import articleList from "./Articles";

function HelpPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [article, setArticle] = useState(articleList[0]);

  const toggle = () => setIsOpen(!isOpen);

  function onArticleClick(article) {
    setArticle(article);
    toggle();
  }

  return (
    <div className="container">
      <Jumbotron>Guides</Jumbotron>
      <div className="article-container">
        {articleList.map((article, index) => (
          <Article article={article} index={index} onClick={onArticleClick} />
        ))}
      </div>
      <GuidesPageModal isOpen={isOpen} toggle={toggle} article={article} />
    </div>
  );
}

export default HelpPage;
