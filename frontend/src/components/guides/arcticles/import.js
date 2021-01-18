import React from "react";

var pageUrl = "/import";
var importPageImg = "/images/articles/import/import-page.PNG";

function ImportArticle() {
  return {
    header: "Importing to Veeqo",
    description: "Guide to importing a file into Veeqo using this site",
    portalTitle: "Import Page",
    portalUrl: pageUrl,
    alt: "import",
    homepageImg: importPageImg,
    content: (
      <div>
        <ul>
          <li>
            Navigate to{" "}
            <a href={pageUrl} target="_blank" rel="noreferrer">
              Import page
            </a>
          </li>
        </ul>
        <img className="article-image" alt="import-page" src={importPageImg} />
      </div>
    ),
  };
}

export default ImportArticle;
