const request = require("postman-request");

const forecast = (long, lat, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=95221c368974b45e855d8e440d57eb48&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to Weather Server!", undefined);
    } else if (body.error) {
      callback("Please speciy a valid location!", undefined);
    } else {
      const data =
        body.current.weather_descriptions[0] +
        " in the evening. It is currently " +
        body.current.temperature +
        " degrees out.";

      callback(undefined, data);
    }
  });
};

module.exports = forecast;