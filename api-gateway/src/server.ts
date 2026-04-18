
import 'dotenv/config';

console.log(process.env.PYTHON_ENDPOINT);


import express from "express";
import cors from "cors";


import uploadRoutes from "./routes/uploadRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());


// clean routes
app.use("/api/pdf", uploadRoutes);
app.use("/api/query", queryRoutes);

const PORT = 5000;

app.listen(PORT,()=>{
    console.log("server running...");
})
