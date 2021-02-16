import ArgosArticle from "./arcticles/argos";
import BandQArticle from "./arcticles/bandq";
import HomebaseArticle from "./arcticles/homebase";
import WayfairArticle from "./arcticles/wayfair";
import ImportArticle from "./arcticles/import";
import RangeStoreArticle from "./arcticles/range_store";
import BulkShippingArticle from "./arcticles/shipping";

function loadArticles() {
  return [
    ArgosArticle(),
    BandQArticle(),
    HomebaseArticle(),
    WayfairArticle(),
    ImportArticle(),
    RangeStoreArticle(),
    BulkShippingArticle(),
  ];
}

export default loadArticles;
