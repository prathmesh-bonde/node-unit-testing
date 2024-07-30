"use strict";

import { Server } from "@hapi/hapi";
import config from "config";

const createServer = async () => {
  const serverConfig = config.get("server");

  const server = new Server({
    host: serverConfig.HOST,
    port: serverConfig.PORT,
  });

  await server.register([
    {
      plugin: helloPlugin,
    },
  ]);

  return server;
};

export default createServer;
