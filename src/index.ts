const server = Bun.serve({
    port: 3000,
    fetch(req) {
      console.log(`Received request for: ${req.url}`);
      printHello();
      incrementRequestCounter();
      return new Response("Hello World!");
    },
  });

console.log(`Listening on http://localhost:${server.port} ...`);

const printHello = () => {
    console.log("Hello World!");
}

let requestCounter = 0;

const incrementRequestCounter = () => {
    requestCounter++;
    console.log(`Request counter: ${requestCounter}`);
}


