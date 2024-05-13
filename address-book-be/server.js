const fastify = require("fastify")({ logger: true });

fastify.addHook("onRequest", (request, reply, done) => {
  reply.header("access-control-allow-origin", "*");
  reply.header(
    "access-control-allow-methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  reply.header("Access-Control-Allow-Headers", "Content-Type");
  reply.header("Content-Type", "application/json");

  done();
});

fastify.get("/", async (request, reply) => {
  try {
    const response = await fetch("http://localhost:3000/users");
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Si è verificato un errore!");
  }
});

fastify.get("/:id", async (request, reply) => {
  try {
    const searchParams = { id: request.params.id };
    const query = new URLSearchParams(searchParams);
    const response = await fetch(
      `http://localhost:3000/users?${query.toString()}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Si è verificato un errore!");
  }
});

fastify.get("/search/:id", async (request, reply) => {
  try {
    const searchParams = { lastname: request.params.id };
    const query = new URLSearchParams(searchParams);
    const response = await fetch(
      `http://localhost:3000/users?${query.toString()}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Si è verificato un errore!");
  }
});

fastify.post("/add-user", async (request, reply) => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: request.body,
    });
    return request.body;
  } catch (error) {
    throw new Error("Si è verificato un errore!");
  }
});

fastify.options("/delete-user/:id", (request, reply, done) => {
  reply.header("access-control-allow-origin", "*");
  reply.header("access-control-allow-methods", "DELETE");
  reply.send();
});

fastify.delete("/delete-user/:id", async (request, reply) => {
  const id = request.params.id;
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Si è verificato un errore!");
  }
});

fastify.listen({ port: 8000 }, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
});
