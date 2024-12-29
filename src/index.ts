const server = Bun.serve({
    port: 3000,
    fetch(req) {
      console.log(`Received request for: ${req.url}`);
      return new Response("Hello World!");
    },
  });

console.log(`Listening on http://localhost:${server.port} ...`);