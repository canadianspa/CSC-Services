import React from "react";

var portalUrl = "https://partners.wayfair.com/v/login/index";
var homepageImg = "/images/articles/wayfair/homepage.png";
var homepageHighlightsImg = "/images/articles/wayfair/homepage-with-highlights.png";
var reportsPageImg = "/images/articles/wayfair/reports-page.png";

function WayfairArticle() {
  return {
    header: "Get Wayfair File",
    description: "Guide to exporting orders from Wayfair's Partner portal",
    portalTitle: "Wayfair Portal",
    portalUrl: portalUrl,
    alt: "bandq",
    homepageImg: homepageImg,
    content: (
      <div>
        <ul>
          <li>
            Login to{" "}
            <a href={portalUrl} target="_blank" rel="noreferrer">
              Wayfair Portal
            </a>
          </li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img className="article-image" alt="homepage" src={homepageHighlightsImg} />
        <ul>
          <li>Click "Orders" in the top left of the page</li>
          <li>Click "Order Exports" in the menu (circled in red)</li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img className="article-image" alt="reports-page" src={reportsPageImg} />
        <ul>
          <li>Click "All Open Orders" (circled in green)</li>
          <li>
            Download the CSV file by clicking "Generate Report" (circled in blue) at
            the bottom of the page
          </li>
        </ul>
      </div>
    ),
  };
}

export default WayfairArticle;
