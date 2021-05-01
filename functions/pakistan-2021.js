// [PHOTO] domain/.netlify/functions/pakistan-2021?base=appDlkHYMFCXKevIv&id=recIn2yA4XTpyUoC9
// [TRAVEL] domain/.netlify/functions/pakistan-2021?base=appv2oResQa7hxFNW&id=rec0GbGEd6JwZiKli
// [ALL] domain/.netlify/functions/pakistan-2021
// [PHOTO] domain/api/pakistan-2021?base=appDlkHYMFCXKevIv&id=recIn2yA4XTpyUoC9
// [TRAVEL]domain/api/pakistan-2021?base=appv2oResQa7hxFNW&id=rec0GbGEd6JwZiKli
// [ALL] domain/api/pakistan-2021

// [Airtable [req] : workspace, base, table]
// [Airtable [res] : records, and fields]
// - process.env.AIRTABLE_API_KEY // [.env] ROOT
// - workspace: SERVERLESS
// - base: TRAVEL
// - table: Pakistan 2021

// [PHOTO] Pakistan 2021
// https://api.airtable.com/v0/appDlkHYMFCXKevIv/Pakistan%202021?api_key=AIRTABLE_API_KEY
// [TRAVEL] Pakistan 2021
// https://api.airtable.com/v0/appv2oResQa7hxFNW/Pakistan%202021?api_key=AIRTABLE_API_KEY

require('dotenv').config();
const Airtable = require('airtable-node');

const base_photo = 'appDlkHYMFCXKevIv'; // base: PHOTO
const base_travel = 'appv2oResQa7hxFNW'; // base: TRAVEL
const all_bases = [base_photo, base_travel]; // all bases
const table = 'Pakistan 2021';

exports.handler = async (event, context, cb) => {
  const { queryStringParameters } = event;
  const { base, id } = event.queryStringParameters;
  const { path } = event;
  console.log({
    path,
    queryStringParameters,
    base,
    id,
  });

  // Get One Record By Base, Id
  if (id) {
    try {
      const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
        .base(base)
        .table(table);
      const record = await airtable.retrieve(id);

      if (record.error) {
        return {
          headers: { 'Access-Control-Allow-Origin': '*' },
          statusCode: 404,
          body: `No photo with base: ${base}, id: ${id}`,
        };
      }
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        // body: JSON.stringify(record),
        body: JSON.stringify(getPhotoBasic(record, base, table)),
      };
    } catch (error) {
      return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 500,
        body: 'Server Error',
      };
    }
  }

  // Get All Records from All Bases
  const photos_base_photo = await getPhotosFromAirtable(base_photo, table);
  const photos_base_travel = await getPhotosFromAirtable(base_travel, table);
  const photos = photos_base_photo.concat(photos_base_travel);
  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body: JSON.stringify(photos),
  };

  // Get All Records from All Bases
  //   try {
  //     const base = 'appDlkHYMFCXKevIv';
  //     const table = 'Pakistan 2021';
  //     const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  //       .base(base)
  //       .table(table);
  //     const { records } = await airtable.list();
  //     const photos = records.map((record) => {
  //       return getPhotoBasic(record, base, table);
  //     });
  //     return {
  //       headers: { 'Access-Control-Allow-Origin': '*' },
  //       statusCode: 200,
  //       // body: JSON.stringify(records),
  //       body: JSON.stringify(photos),
  //     };
  //   } catch (error) {
  //     return {
  //       headers: { 'Access-Control-Allow-Origin': '*' },
  //       statusCode: 500,
  //       body: 'Server Error',
  //     };
  //   }
};

const getPhoto = (record, base, table) => {
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

const getPhotoBasic = (record, base, table) => {
  const { id, createdTime } = record;
  const { location, Photo, Created, Name, order } = record.fields;
  const { url, filename, size, type, thumbnails } = Photo[0];
  const url_36 = thumbnails.small.url; // height = max 36
  const url_512 = thumbnails.large.url; // width or height = max 512
  const url_3000 = thumbnails.full.url; // width or height = max 3000

  return {
    base,
    table,
    id,
    name: Name,
    location,
    date: Created,
    order,
    createdTime,
    size,
    type,
    // url,
    url_512,
    url_3000,
    // filename,
  };

  //   const { id, name, location, date, url, size, createdTime, order, type } = props;
  //   const add = thumbnails?.large?.url

  // const { id, name, location, date, url, size, createdTime, order } = props;
  // let url_large = `https://via.placeholder.com/3000x3000.png`;
  // if (props?.thumbnails?.large?.url) {
  //   url_large = props?.thumbnails?.large?.url;
};

const getPhotosFromAirtable = async (base, table) => {
  try {
    const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(base)
      .table(table);
    const { records } = await airtable.list();
    const photos = records.map((record) => {
      return getPhotoBasic(record, base, table);
    });
    return photos;
  } catch (error) {
    return [];
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
