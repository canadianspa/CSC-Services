import React from "react";

var pageUrl = "/shipping";
var veeqoUrl = "https://app.veeqo.com/orders";
var shippingPage = "/images/articles/shipping/shipping-page.png";
var shippingOrdersPage = "/images/articles/shipping/shipping-orders-page.png";
var shippingShipmentPage = "/images/articles/shipping/shipping-shipment-page.png";
var veeqoOrdersPage = "/images/articles/shipping/veeqo-orders.png";
var veeqoOrdersExportPage = "/images/articles/shipping/veeqo-orders-export.png";
var veeqoOrdersDownloadPage = "/images/articles/shipping/veeqo-orders-download.png";

function BulkShippingArticle() {
  return {
    header: "Bulk Shipping",
    description: "Guide to shipping multiple orderswith XDP/DX",
    portalTitle: "Shipping Page",
    portalUrl: pageUrl,
    alt: "shipping",
    homepageImg: shippingPage,
    content: (
      <div>
        <ul>
            <li>
                Navigate to the{" "}
                <a href={veeqoUrl} target="_blank" rel="noreferrer">
                Veeqo orders page
                </a>
            </li>
        </ul>
        <img alt="veeqo" src={veeqoOrdersPage} />
        <ul>
            <li>Select the orders you want to create a shipment for by clicking in the appropriate tick box(s) (circled in red)</li>
            <li>Click actions (circled in yellow), and then export (circled in green)</li>
        </ul>
        <img alt="export" src={veeqoOrdersExportPage} />
        <ul>
            <li>You should then see the above window, press "Export Orders"</li>
            <li>Press "Ok got it" in the next window</li>
        </ul>
        <img alt="download" src={veeqoOrdersDownloadPage} />
        <ul>
            <li>Once the orders are downloaded they will show up in the notifications panel</li>
            <li>To see this, click on the bell in the top right of the page (circled in brown)</li>
            <li>Find the appropriate notification, likely at the bottom (circled in pink)</li>
            <li>Press download (circled in purple)</li>
            <li>The file will download</li>
        </ul>
        <ul>
          <li>
            Next, go to the{" "}
            <a href={pageUrl} target="_blank" rel="noreferrer">
              shipping page
            </a>
            as seen below
          </li>
        </ul>
        <img alt="shipping" src={shippingPage} />
        <ul>
            <li>Drag the downloaded file into the box or click and select the file to use</li>
        </ul>
        <img alt="orders" src={shippingOrdersPage} />
        <ul>
            <li>Ensure these are the correct orders to ship, and contain the expected products</li>
            <li>Press "Continue"</li>
        </ul>
        <img alt="shipment" src={shippingShipmentPage} />
        <ul>
            <li>Select the service/carrier to use (circled in red)</li>
            <li>Add parcels by clicking "+" (circled in brown)</li>
            <li>Press "Ship" when ready to create shipments</li>
        </ul>
      </div>
      
    ),
  };
}

export default BulkShippingArticle;
