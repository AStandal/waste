const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);
        console.log(`Received request for: ${url.pathname}`);

        // Serve favicon
        if (url.pathname === '/favicon.ico') {
            return new Response(Bun.file('./src/public/Piggy.jpg'), {
                headers: {
                    'Content-Type': 'image/jpeg',
                },
            });
        }

        // Serve CSS file
        if (url.pathname === '/styles.css') {
            return new Response(Bun.file('./src/styles.css'), {
                headers: {
                    'Content-Type': 'text/css',
                },
            });
        }

        // Serve JavaScript file (explicitly transpiled from TypeScript)
        if (url.pathname === '/app.js') {
            const result = await Bun.build({
                entrypoints: ['./src/app.ts'],
                outdir: './dist',
            });
            
            return new Response(result.outputs[0], {
                headers: {
                    'Content-Type': 'application/javascript',
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