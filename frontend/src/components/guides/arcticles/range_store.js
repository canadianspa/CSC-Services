import React from "react";

var portalUrl = "https://supplier.therange.co.uk/login.asp";
var homepageImg = "/images/articles/range_store/homepage.PNG";
var homepageHighlightsImg =
  "/images/articles/range_store/homepage-with-highlights.PNG";
var dexHomepageImg = "/images/articles/range_store/dex-homepage.PNG";
var dexOrdersPageImg = "/images/articles/range_store/dex-orders-page.PNG";
var dexOrderDownloadPageImg =
  "/images/articles/range_store/dex-order-download-page.PNG";

function RangeStoreArticle() {
  return {
    header: "Get Range Store Order File",
    description: "Guide to exporting store orders from The Range Extranet",
    portalTitle: "Range Extranet",
    portalUrl: portalUrl,
    alt: "range_store",
    homepageImg: homepageImg,
    content: (
      <div>
        <ul>
          <li>
            Login to the{" "}
            <a href={portalUrl} target="_blank" rel="noreferrer">
              Range Extranet
            </a>
          </li>
        </ul>
        <img alt="homepage" src={homepageHighlightsImg} />
        <ul>
          <li>Hover over "Applications" (circled in green)</li>
          <li>Click "DEX" (circled in red)</li>
          <li>You should be taken to the page below</li>
        </ul>
        <img alt="dex-homepage" src={dexHomepageImg} />
        <ul>
          <li>Hover over "Purchase Orders" (circled in pink)</li>
          <li>
            Click "Downloaded" for old/archived purchase orders (circled in blue)
          </li>
          <li>Click "Not Downloaded" for new purchase orders (circled in yellow)</li>
          <li>You should be taken to the page below</li>
        </ul>
        <img alt="dex-orders-page" src={dexOrdersPageImg} />
        <ul>
          <li>Click "View" (circled in black) on the order you want to download</li>
        </ul>
        <img alt="dex-order-download-page" src={dexOrderDownloadPageImg} />
        <ul>
          <li>Click "Save" (circled in dark blue)</li>
          <li>Click "CSV" (circled in purple)</li>
          <li>The CSV file should now download</li>
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

export default RangeStoreArticle;
