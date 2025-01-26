import { scrapePropositions } from './scraper';
import landingPage from './landingPage.html';

const server = Bun.serve({
    port: 3000,
    development: true,
    static: {
        "/landing": landingPage,
    },
    async error(error) {
        console.error(`Error: ${error.message}`);
        
        let errorTemplate = await Bun.file('./error.html').text();
        errorTemplate = errorTemplate
            .replace('{{ERROR_MESSAGE}}', error.message);

        return new Response(errorTemplate, {
            headers: {
                'Content-Type': 'text/html',
            },
            status: 500,
        });
    },
    async fetch(req) {
        const url = new URL(req.url);
        console.log(`Received request for: ${url.pathname}`);

        // Add new route for scraping
        if (url.pathname === '/scrape') {
            try {
                const propositions = await scrapePropositions();
                return new Response(JSON.stringify(propositions, null, 2), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: 'Failed to scrape data' }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        }

        // Serve favicon
        if (url.pathname === '/favicon.ico') {
            return new Response(Bun.file('./public/Piggy.jpg'), {
                headers: {
                    'Content-Type': 'image/jpeg',
                },
            });
        }

        // Serve CSS file
        if (url.pathname === '/styles.css') {
            return new Response(Bun.file('./styles.css'), {
                headers: {
                    'Content-Type': 'text/css',
                },
            });
        }

        // Serve JavaScript file (explicitly transpiled from TypeScript)
        if (url.pathname === '/app.js') {
            const transpiled = await Bun.build({
                entrypoints: ['./app.ts'],
                outdir: './dist',
            });
            
            return new Response(transpiled.outputs[0], {
                headers: {
                    'Content-Type': 'application/javascript',
                },
            });
        }

        // Serve HTML file
        return new Response(Bun.file('./index.html'), {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);