const jsdom = require("jsdom");
const got = require("got");
const { JSDOM } = jsdom;

const metascraper = require("metascraper")([
  require("@samirrayani/metascraper-shopping")(),
  require("metascraper-title")(),
  require("metascraper-image")(),
  require("metascraper-description")(),
  require("metascraper-url")(),
]);

async function uniParser({ url: hosturl }) {
  try {
    // let request = await fetch(url);
    // let html = await request.text();
    // let dom = new JSDOM(html);
    // let doc = dom.window.document;

    // const price = doc.body.innerHTML.match("(\\d+\\.\\d{1,2})")[0];
    const { body: html, url } = await got(hosturl);
    const metadata = await metascraper({ html, url });
    return {
      ...metadata,
    };
  } catch (error) {
    console.error(error);
  }
}

exports.uniParser = uniParser;
