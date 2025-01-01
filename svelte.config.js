import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // Adapter for static site generation
        adapter: adapter({
            // Directory where the static site will be built
            pages: 'build',
            // Directory for static assets
            assets: 'build',
            // Set this to true if you're deploying to subdirectories
            fallback: 'index.html',
            // Precompress files with brotli and gzip
            precompress: true,
            // Strict mode for deployment
            strict: true
        }),
        
        // Handle paths for Cloudflare Pages
        paths: {
            base: ''
        },

        // Ensure client-side routing works correctly
        prerender: {
            handleHttpError: ({ path, referrer, message }) => {
                // Ignore static assets
                if (path.startsWith('/static/')) {
                    return;
                }

                // Throw an error for missing pages
                throw new Error(message);
            }
        }
    },

    // Enable Vite preprocessing for components
    preprocess: vitePreprocess()
};

export default config;