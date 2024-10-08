import express from "express";
import https from "https";
import { Server } from "socket.io";
import { makeEvents } from "./events";
import { env } from "./env";
import http from "http";
import fs from "fs";
import { rateLimitMiddleware } from "../middlewares/rate-limit";
import { cors } from "../middlewares/cors";

const app = express();
app.use(cors);
app.use(rateLimitMiddleware);

let server: any;

if (env.cert) {
  server = https.createServer(
    {
      cert: fs.readFileSync(env.cert),
      key: fs.readFileSync(env.key),
    },
    app
  );
} else {
  server = http.createServer(app);
}

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
makeEvents(io);

export { server };
