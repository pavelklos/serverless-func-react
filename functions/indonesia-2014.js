// [record]  domain/api/indonesia-2014?id=rec0GbGEd6JwZiKli
// [records] domain/api/indonesia-2014

// [Airtable [req] : workspace, base, table]
// [Airtable [res] : records, and fields]
// - process.env.AIRTABLE_API_KEY // [.env] ROOT
// - workspace: SERVERLESS
// - base: INDONESIA 2014
// - table: Photos

// [INDONESIA 2014] Photos
// https://api.airtable.com/v0/appj9MTTMkLZqFh5X/Photos?api_key=AIRTABLE_API_KEY

require("dotenv").config();
const Airtable = require("airtable-node");

const base = "appj9MTTMkLZqFh5X";
const table = "Photos";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(base)
  .table(table);

exports.handler = async (event, context, cb) => {
  // Get All Records
  try {
    const { records } = await airtable.list({
      maxRecords: 1200, // 20
      sort: [{ field: "order", direction: "asc" }], // asc, desc
    });
    const photos = records.map((record) => {
      return getPhoto(record);
    });
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 200,
      // body: JSON.stringify(records),
      body: JSON.stringify(photos),
    };
  } catch (error) {
    return {
      headers: { "Access-Control-Allow-Origin": "*" },
      statusCode: 500,
      body: "Server Error",
    };
  }
};

const getPhoto = (record) => {
  const { id, createdTime } = record;
  const { order, name, photo } = record.fields;
  const { url, filename, size, type, thumbnails } = photo[0];
  const url_36 = thumbnails.small.url; // height = max 36
  const url_512 = thumbnails.large.url; // width or height = max 512
  const url_3000 = thumbnails.full.url; // width or height = max 3000
  return {
    // base,
    // table,
    // id,
    order,
    name,
    // createdTime,
    // size,
    // type,
    // url,
    url_512,
    url_3000,
    // filename,
  };
};
