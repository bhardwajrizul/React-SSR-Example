import http from 'http';
import express from 'express';
import { build as esBuild } from 'esbuild';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

const app = express();

const server = http.createServer(app);

// Step 3 -> Recieve a request
app.get('/', async (req, res) => {
    // Step 4 -> Import the build/page.js
    const Page = await import('./build/page.js'); 
    // Step 5 -> Use rederToString to convert the page with react to html
    const html = renderToString(createElement(Page.default));
    // Setp 6 -> Send the html to the client
    return res.send(html);
});

// STEP 1 -> Run the server
server.listen(3000, async () => {
    await build(); // STEP 2 -> Build the app/page.jsx
    console.log('Server is running on port 3000');
});


async function build() {
    await esBuild({
        bundle: true,
        format: 'esm',
        logLevel: 'error',
        entryPoints: ['./app/page.jsx'],
        outdir: './build/',
        packages: 'external'
    })
}