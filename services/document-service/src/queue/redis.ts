

import Redis from "ioredis";

console.log("REDIS FILE LOADED");

const connection = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("Connected to Redis");
});


connection.on("error", (err) => {
  console.log(" Redis Error:", err.message);
});


export default connection;