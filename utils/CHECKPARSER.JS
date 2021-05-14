const pickFn = (sizes, pickDefault) => {
  const appleTouchIcon = sizes.find((item) => item.rel.includes("apple"));
  return appleTouchIcon || pickDefault(sizes);
};
const metascraper = require("metascraper")([
  require("@samirrayani/metascraper-shopping")(),
  require("metascraper-logo-favicon")({
    pickFn,
  }),
  require("metascraper-title")(),
  require("metascraper-image")(),
  require("metascraper-description")(),
  require("metascraper-url")(),
]);

const got = require("got");
var _url =
  "https://www.ebay.com/itm/224455890439?_trkparms=aid%3D111001%26algo%3DREC.SEED%26ao%3D1%26asc%3D20160908105057%26meid%3D43d737d01dd6426c9104379ff5ac9210%26pid%3D100675%26rk%3D1%26rkt%3D15%26sd%3D224455890439%26itm%3D224455890439%26pmt%3D0%26noa%3D1%26pg%3D2380057%26brand%3DNike&_trksid=p2380057.c100675.m4236&_trkparms=pageci%3Ab366d46d-b461-11eb-a043-ee19cb98be5f%7Cparentrq%3A68d915a31790a9b186a01456ffdc687e%7Ciid%3A1";

async function test(_url) {
  try {
    let { html, url } = await got(_url, { retry: 0 }); // promise chaining resolves DSG issue?
    const metadata = await metascraper({ html, url });
    return metadata;
  } catch (error) {
    console.log(error);
  }
}

async function _test() {
  let result = await test(_url);
  console.log(result, "result");
  return result;
}

console.log(_test());
