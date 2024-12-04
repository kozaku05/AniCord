const axios = require("axios");
const xml2js = require("xml2js");

async function getData(id) {
  try {
    let data = await axios.get(
      "https://cal.syoboi.jp/db.php?Command=TitleLookup&Fields=Title&TID=" + id
    );
    return new Promise((resolve, reject) => {
      xml2js.parseString(data.data, (err, result) => {
        if (err) {
          return reject("Error parsing XML: " + err.message);
        }
        const titleItems =
          result.TitleLookupResponse.TitleItems?.[0]?.TitleItem;
        if (titleItems && titleItems.length > 0) {
          const item = titleItems[0];
          const title = item.Title[0];
          const itemId = item.$.id;
          resolve({ itemId, title });
        } else {
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}
module.exports = getData;
