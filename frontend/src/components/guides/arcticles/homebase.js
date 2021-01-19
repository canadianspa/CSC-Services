import React from "react";

const portalUrl = "https://cloud.freeway.opentext.com/Account/SignIn";
const homepageImg = "/images/articles/homebase/homepage.png";
const documentsPageImg = "/images/articles/homebase/documents-page.png";
const dataPageImg = "/images/articles/homebase/view-data-page.png";
const emailPopupImg = "/images/articles/homebase/send-email-popup.png";
const dataEmailImg = "/images/articles/homebase/data-email.png";

function HomebaseArticle() {
  return {
    header: "Get Homebase File",
    description: "Guide to exporting an order from the Homebase Freeway EDI portal",
    portalTitle: "Freeway EDI",
    portalUrl: portalUrl,
    alt: "homebase",
    homepageImg: homepageImg,
    content: (
      <div>
        <ul>
          <li>
            Login to{" "}
            <a href={portalUrl} target="_blank" rel="noreferrer">
              Freeway EDI
            </a>
          </li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img className="article-image" alt="homepage" src={homepageImg} />
        <ul>
          <li>Click on the "Documents" area to the right</li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img className="article-image" alt="docs-page" src={documentsPageImg} />
        <ul>
          <li>Click in the checkbox next to the order to upload (circled in red)</li>
          <li>Click "View Data" (circled in green)</li>
          <li>You should be redirected to the page below</li>
        </ul>
        <img className="article-image" alt="data-page" src={dataPageImg} />
        <ul>
          <li>Click the message icon (circled in blue)</li>
        </ul>
        <img className="article-image" alt="popup-img" src={emailPopupImg} />
        <ul>
          <li>Enter your email, and click "Send"</li>
          <li>You should get the following email within 5 minutes</li>
        </ul>
        <img className="article-image" alt="email-data" src={dataEmailImg} />
        <ul>
          <li>Save the attachment "xxxxxxxx.xml"</li>
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

export default HomebaseArticle;
