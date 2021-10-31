import express from "express"

import cors from "cors";

import listEndpoints from "express-list-endpoints";

import { join } from "path"

import mediaRouter from "./services/media/index"

import { genericErrorHandler, badRequestHandler, unauthorizedHandler, notFoundHandler } from "./services/errorHandlers.js"


const server = express()

// *********************** GLOBAL MIDDLEWARES *********************

const whitelist = [process.env.FE_LOCAL_URL]
const corsOpts = {
  origin: function (origin, next) {
    // Since CORS is a global middleware, it is going to be executed for each and every request --> we are able to "detect" the origin of each and every req from this function
    console.log("CURRENT ORIGIN: ", origin)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      // If origin is in the whitelist or if the origin is undefined () --> move ahead
      next(null, true)
      // next(null, true) is the next step. You might have to ask Ricardo to tell you why bro
    } else {
      // If origin is NOT in the whitelist --> trigger a CORS error
      next(new Error("CORS ERROR"))
    }
  },
}

server.use(cors(corsOpts))
server.use(express.json())

// ************************ ENDPOINTS **********************

server.use("/media", mediaRouter)

// *********************** ERROR MIDDLEWARES ***************************

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

const port = process.env.PORT

console.table(listEndpoints(server))

server.listen(port, () => {
    console.log("Port is running on port: ", port)
})