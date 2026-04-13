
import 'dotenv/config';

console.log(process.env.PYTHON_ENDPOINT);


import express from "express";
import cors from "cors";

import route from "./routes/test.router.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/test",route);
app.use("/api/pdf/",route);
const PORT = 5000;

app.listen(PORT,()=>{
    console.log("server running...");
})
