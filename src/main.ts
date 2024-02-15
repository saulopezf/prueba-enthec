import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();
const port = 3000;

mongoose
    .connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on portt ${port}`);
});
