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
    alt: "wayfair",
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
        <img alt="homepage" src={homepageHighlightsImg} />
        <ul>
          <li>Click "Orders" in the top left of the page</li>
          <li>Click "Order Exports" in the menu (circled in red)</li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img alt="reports-page" src={reportsPageImg} />
        <ul>
          <li>Click "All Open Orders" (circled in green)</li>
          <li>
            Download the CSV file by clicking "Generate Report" (circled in blue) at
            the bottom of the page
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

export default WayfairArticle;
