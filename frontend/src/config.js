export const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:4000/api";

export const UPDATE_VENDORS = [
  { name: "bandq", title: "B&Q" },
  { name: "homebase", title: "Homebase" },
  { name: "jtf", title: "JTF" },
  { name: "wayfair", title: "Wayfair" },
  { name: "range", title: "The Range" },
  { name: "travisperkins", title: "Travis Perkins" },
  { name: "robert_dyas", title: "Robert Dyas" },
  { name: "hornbach", title: "Hornbach" },
  { name: "shop_direct", title: "Shop Direct" },
];

export const IMPORT_VENDORS = [
  {
    name: "bandq",
    title: "B&Q CSV",
    requires_file: true,
    file_type: ".csv",
  },
  {
    name: "argos",
    title: "Argos CSV",
    requires_file: true,
    file_type: ".csv",
  },
  {
    name: "range",
    title: "The Range",
    requires_file: false,
    file_type: null,
  },
  {
    name: "range_store",
    title: "Range Store CSV",
    requires_file: true,
    file_type: ".csv",
  },
  {
    name: "homebase",
    title: "Homebase XML",
    requires_file: true,
    file_type: ".xml",
  },
  {
    name: "wayfair",
    title: "Wayfair CSV",
    requires_file: true,
    file_type: ".csv",
  },
  {
    name: "robert_dyas",
    title: "Robert Dyas CSV",
    requires_file: true,
    file_type: ".csv",
  },
  {
    name: "robert_dyas_edge",
    title: "Robert Dyas Edge CSV",
    requires_file: true,
    file_type: ".csv",
  },
  {
    name: "shop_direct",
    title: "Shop Direct TXT",
    requires_file: true,
    file_type: ".txt",
    disabled: true,
  },
  {
    name: "globus",
    title: "Globus XML",
    requires_file: true,
    file_type: ".xml",
  },
  {
    name: "hornbach",
    title: "Hornbach PDF",
    requires_file: true,
    file_type: ".pdf",
    disabled: true,
  },
];

export const EMAILS = [
  "warehouseuk@canadianspacompany.com",
  "shippinguk@canadianspacompany.com",
  "jasper.haward@canadianspacompany.com",
  "kerry.avis@canadianspacompany.com",
  "grace.wetherall@canadianspacompany.com",
  "phil@canadianspacompany.com",
  "tony@canadianspacompany.com",
  "troy@canadianspacompany.com",
  "troy.d.labelle@gmail.com",
  "troylabellespa@googlemail.com",
  "david.knight@canadianspacompany.com",
  "gary.beadell@canadianspacompany.com",
  "kerry.williams@canadianspacompany.com",
  "tony.greig@canadianspacompany.com",
  "adam.miller@canadianspacompany.com",
];

export const PRODUCTS = [
  "Grand Rapids 2014 - 2016",
  "Rio Grande 2014 - 2016",
  "Swift Current 2014 - 2016",
  "Muskoka 2012 - 2016",
  "Grand Rapids V2 2017",
  "Rio Grande V2 2017",
  "Swift Current V2 2017",
  "Muskoka V2 2017",
];
