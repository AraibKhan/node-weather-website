const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXJhaWIiLCJhIjoiY2t5MXZjNXdnMGZlbTJycW5pb29iZDA1MSJ9.NBplRsKiK-TLUB2As9PTEQ&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find your location, Please try a different keyword!",
        undefined
      );
    } else {
      const data = {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
