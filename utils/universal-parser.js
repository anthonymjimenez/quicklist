const jsdom = require("jsdom");
const got = require("got");
const { JSDOM } = jsdom;

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

async function uniParser(hosturl) {
  try {
    // let request = await fetch(url);
    // let html = await request.text();
    // let dom = new JSDOM(html);
    // let doc = dom.window.document;

    // const price = doc.body.innerHTML.match("(\\d+\\.\\d{1,2})")[0];
    const { body: html, url } = await got(hosturl);
    const metadata = await metascraper({ html, url });
    metadata.availability =
      metadata.availability === "https://schema.org/InStock" ||
      metadata.availability === true;

    return {
      ...metadata,
    };
  } catch (error) {
    console.error(error);
  }
}

exports.uniParser = uniParser;
