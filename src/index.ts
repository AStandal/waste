const html = await Bun.file("./src/index.html").text();

const server = Bun.serve({
    port: 3000,
    fetch(req) {
      console.log(`Received request for: ${req.url}`);
      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    },
  });

console.log(`Listening on http://localhost:${server.port} ...`);