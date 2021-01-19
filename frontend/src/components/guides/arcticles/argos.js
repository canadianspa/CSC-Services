import React from "react";

var portalUrl = "https://argos.the-edge.io/cas/login";
var homepageImg = "/images/articles/argos/homepage.png";
var homepageHighlightsImg = "/images/articles/argos/homepage-with-highlights.png";
var ordersPageHighlightsImg =
  "/images/articles/argos/orders-page-with-highlights.png";

function ArgosArticle() {
  return {
    header: "Get Argos File",
    description: "Guide to exporting orders from the Argos Edge portal",
    portalTitle: "The Edge",
    portalUrl: portalUrl,
    alt: "argos",
    homepageImg: homepageImg,
    content: (
      <div>
        <ul>
          <li>
            Login to{" "}
            <a href={portalUrl} target="_blank" rel="noreferrer">
              The Edge portal
            </a>
          </li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img className="article-image" alt="homepage" src={homepageHighlightsImg} />
        <ul>
          <li>Click on "Orders" in the top left of the page (circled in red)</li>
          <li>Click "Find orders" (circled in green)</li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img
          className="article-image"
          alt="orders-page"
          src={ordersPageHighlightsImg}
        />
        <ul>
          <li>
            Select the required orders by clicking in the relative checkbox(s)
            (circled in red)
          </li>
          <li>
            Download the CSV file by clicking "EXPORT TO CSV" (circled in green)
          </li>
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

export default ArgosArticle;
