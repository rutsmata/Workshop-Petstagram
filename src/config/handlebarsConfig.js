const handlebars = require("express-handlebars");

function handlebarsConfig(app) {
  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
    })
  );
  app.set("view engine", "hbs");
  app.set("views", "src/views"); // in case views are within src folder
}

module.exports = handlebarsConfig;
