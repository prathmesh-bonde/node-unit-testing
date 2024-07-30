import createServer from "./server.js";

const startServer = async () => {
  try {
    const server = await createServer();
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
  } catch (error) {
    console.log("Error starting server: ", error);
  }
};

startServer();
