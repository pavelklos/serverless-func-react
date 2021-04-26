// domain/.netlify/functions/photo-pakistan-2021?id=recIn2yA4XTpyUoC9
// domain/.netlify/functions/photo-pakistan-2021
// domain/api/photo-pakistan-2021?id=recIn2yA4XTpyUoC9
// domain/api/photo-pakistan-2021

// [Airtable [req] : workspace, base, table]
// [Airtable [res] : records, and fields]
// - process.env.AIRTABLE_API_KEY // [.env] ROOT
// - workspace: SERVERLESS
// - base: PHOTO
// - table: Pakistan 2021

// [PHOTO] Pakistan 2021
// https://api.airtable.com/v0/appDlkHYMFCXKevIv/Pakistan%202021?api_key=AIRTABLE_API_KEY
// [TRAVEL] Pakistan 2021
// https://api.airtable.com/v0/appv2oResQa7hxFNW/Pakistan%202021?api_key=AIRTABLE_API_KEY

require("dotenv").config();
const Airtable = require("airtable-node");

const base = "appDlkHYMFCXKevIv";
const table = "Pakistan 2021";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(base)
  .table(table);

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;
  const { path } = event;
  console.log({ path });

  // Get One Record By Id
  if (id) {
    try {
      const record = await airtable.retrieve(id);
      if (record.error) {
        return {
          headers: { "Access-Control-Allow-Origin": "*" },
          statusCode: 404,
          body: `No prodcut with id: ${id}`,
        };
      }
      return {
        headers: { "Access-Control-Allow-Origin": "*" },
        statusCode: 200,
        // body: JSON.stringify(record),
        body: JSON.stringify(getPhoto(record)),
      };
    } catch (error) {
      return {
        headers: { "Access-Control-Allow-Origin": "*" },
        statusCode: 500,
        body: "Server Error",
      };
    }
  }

  // Get All Records
  try {
    const { records } = await airtable.list();
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
  const { location, Photo, Created, Name, order } = record.fields;
  const { url, filename, size, type, thumbnails } = Photo[0];
  return {
    base,
    table,
    id,
    createdTime,
    location,
    date: Created,
    name: Name,
    url,
    filename,
    size,
    type,
    thumbnails,
    order,
  };
};
