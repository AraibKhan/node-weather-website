const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

//Define paths
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Araib Khan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Araib Khan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Araib Khan",
    helpText: "Some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
}); //End of .get(/weather)

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term.",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Araib Khan",
    errText: "Help Article Not Found!",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Araib Khan",
    errText: "Page Not Found!",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
