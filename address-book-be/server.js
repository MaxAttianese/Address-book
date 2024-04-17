const fastify = require("fastify")({ logger: true });

fastify.addHook("onRequest", (request, reply, done) => {
  reply.header(
    "access-control-allow-origin",
    "*"
  );
  reply.header(
    "access-control-allow-methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  reply.header(
    "Access-Control-Allow-HEADERS",
    "Origin, Content-Type, Authorization"
  );
  reply.header("Content-Type", "application/json");
  done();
});

fastify.get("/", async (request, reply) => {
  try {
    const response = await fetch("http://localhost:3000/users");
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Si è verificato iun errore!");
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
    throw new Error("Si è verificato iun errore!");
  }
});

fastify.delete("/delete-user/:id", async (request, reply) => {
  const id = request.params.id;
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    reply.send({message: "Utente eliminato con successo"});
  } catch (error) {
    throw new Error("Si è verificato iun errore!");
  }
});

fastify.listen({ port: 8000 }, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
});
