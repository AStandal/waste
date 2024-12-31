const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url);
        console.log(`Received request for: ${url.pathname}`);

        // Serve CSS file
        if (url.pathname === '/styles.css') {
            return new Response(Bun.file('./src/styles.css'), {
                headers: {
                    'Content-Type': 'text/css',
                },
            });
        }

        // Serve HTML file
        return new Response(Bun.file('./src/index.html'), {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);