const fastify = require("fastify")({ logger: true });

fastify.addHook("onRequest", (request, reply, done) => {
  reply.header("access-control-allow-origin", "*");
  reply.header(
    "access-control-allow-methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  reply.header("Access-Control-Allow-HEADERS", "Content-Type");
  reply.header("Content-Type", "application/json");
  done();
});

fastify.get("/", async (request, reply) => {
  try {
    const response = await fetch("http://localhost:3000/users");
    return response;
  } catch (error) {
    console.log(error);
  }
});

fastify.post("/add-user", async (request, reply) => {
  try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: request.body,
      });
      return response;
  } catch (error) {
    
  }
});

fastify.listen({ port: 8000 }, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
});
