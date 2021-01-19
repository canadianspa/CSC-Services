import ArgosArticle from "./arcticles/argos";
import BandQArticle from "./arcticles/bandq";
import HomebaseArticle from "./arcticles/homebase";
import WayfairArticle from "./arcticles/wayfair";
import ImportArticle from "./arcticles/import";

function loadArticles() {
  return [
    ArgosArticle(),
    BandQArticle(),
    HomebaseArticle(),
    WayfairArticle(),
    ImportArticle(),
  ];
}

export default loadArticles;
