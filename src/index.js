const express = require("express");

const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const dbConnect = require('./config/dbConfig')
const { errorHandler } = require("./middlewares/errorHandlerMiddleware");
const routes = require("./routes");


const app = express();

const { PORT } = require("./config/constants");

expressConfig(app);
handlebarsConfig(app);

dbConnect()
.then(() => console.log('DB connected successfully!'))
.catch(err => console.log('DB error: ', err.message))

app.use(routes);
//app.use(errorHandler); // ** it must be after app.use(routes); deactivated due to error when directing to 404 from errorHandleMiddleware


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
