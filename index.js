import express from "express";
import debug from "debug";
import kafkaRoutes from "./routes.js";

const app= express();
const logger = debug('node-kafka:server') // same name as in package.json
app.use(express.json());
app.use('/kafka', kafkaRoutes)
app.listen(8080, ()=>{
    logger('Runnig @ http://localhost:8080');
})