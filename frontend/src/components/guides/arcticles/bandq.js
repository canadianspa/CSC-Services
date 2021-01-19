import React from "react";

var portalUrl = "https://kingfisher.edt.fr/BCP-Web/jsp/index.jsp";
var homepageImg = "/images/articles/bandq/half-homepage.png";
var homepageHighlightsImg = "/images/articles/bandq/homepage-with-highlights.png";

function BandQArticle() {
  return {
    header: "Get B&Q File",
    description: "Guide to exporting orders from the B&Q Kingfisher portal",
    portalTitle: "Kingfisher Portal",
    portalUrl: portalUrl,
    alt: "bandq",
    homepageImg: homepageImg,
    content: (
      <div>
        <ul>
          <li>
            Login to{" "}
            <a href={portalUrl} target="_blank" rel="noreferrer">
              Kingfisher portal
            </a>
          </li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img className="article-image" alt="homepage" src={homepageHighlightsImg} />
        <ul>
          <li>
            Select the order(s) to export by clicking in their respective checkbox
            (circled in red)
          </li>
          <li>Download the file by clicking "Export CSV"</li>
          <li>
            A guide to uploading the file can be found{" "}
            <a href="/guides/import" target="_blank" rel="noreferrer">
              here
            </a>
          </li>
        </ul>
      </div>
    ),
  };
}

export default BandQArticle;
