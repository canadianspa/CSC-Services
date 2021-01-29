import React from "react";

var pageUrl = "/import";
var importPageImg = "/images/articles/import/import-page.PNG";
var importPageDropdownImg = "/images/articles/import/import-page-with-dropdown.PNG";
var importTableImg = "/images/articles/import/import-table.PNG";
var importTableOptionsImg = "/images/articles/import/import-table-with-options.PNG";
var addressModalImg = "/images/articles/import/address-modal.PNG";

function ImportArticle() {
  return {
    header: "Importing to Veeqo",
    description: "Guide to importing a file into Veeqo using CSC Services",
    portalTitle: "Import Page",
    portalUrl: pageUrl,
    alt: "import",
    homepageImg: importPageImg,
    content: (
      <div>
        <ul>
          <li>
            Navigate to the{" "}
            <a href={pageUrl} target="_blank" rel="noreferrer">
              Import page
            </a>
          </li>
        </ul>
        <img alt="import-page" src={importPageDropdownImg} />
        <ul>
          <li>
            Select which file you want to upload from the dropdown (some are greyed
            out)
          </li>
        </ul>
        <img alt="import-page" src={importPageImg} />
        <ul>
          <li>
            You can drag and drop a file into the dashed area or click to select the
            file to upload
          </li>
        </ul>
        <img alt="import-table" src={importTableImg} />
        <ul>
          <li>Orders found in the file will be shown here</li>
          <li>
            You can select the orders to upload using the checkboxs on the left
            (circled in green)
          </li>
          <li>
            You may click "Edit Address" to change the address based on the Postcode
            (circled in red)
          </li>
        </ul>
        <img alt="address-modal" src={addressModalImg} />
        <ul>
          <li>After clicking "Edit Address" this window will pop up</li>
          <li>
            To change the address of an order, select the address you want to use and
            click "Update" (blue button)
          </li>
        </ul>
        <img alt="address-modal" src={importTableOptionsImg} />
        <ul>
          <li>
            The yellow circle above shows the only selected order, only selected
            orders will be imported to Veeqo
          </li>
          <li>
            Once you are ready to upload the order into Veeqo, click "Import"
            (circled in blue)
          </li>
          <li>The order should be on Veeqo</li>
        </ul>
      </div>
    ),
  };
}

export default ImportArticle;
