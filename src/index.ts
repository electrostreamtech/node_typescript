import express from "express";
import { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import EventRoute from "./Routes/EventRoute";
import morgan from "morgan";
const app = express();
const cors = require("cors");
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
//morgan used for logging
// app.use(morgan("dev"));
app.use(morgan<Request, Response>("dev"));

const server_port = 5000;

//event route
app.use("/event", EventRoute);

//404 response
app.use((error: any, res: Response, next: NextFunction) => {
  try {
    res.status(404).send("Resource not found");
  } catch (error) {
    next(error);
  }
});

app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
});
const port = server_port || 5000;
app.listen(port, () => {
  console.log(`Application started on ${port}...`);
});

export default app;
