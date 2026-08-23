const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Replace emails
html = html.replace(/contact@minamedical\.ca/gi, 'hello@hmsolutions.ca');

// 2. Replace phone numbers
html = html.replace(/\(905\) 906-8077/g, '(555) 123-4567');
html = html.replace(/9059068077/g, '5551234567');
html = html.replace(/tel:9059068077/g, 'tel:5551234567');

// 3. Replace social handles
html = html.replace(/minamedmarketing/gi, 'hmsolutions');
html = html.replace(/murad-stores/gi, 'hm-solutions');

// 4. Safely replace minamedical.ca links in href attributes (excluding WP assets)
html = html.replace(/href="https:\/\/minamedical\.ca([^"]*)"/g, (match, path) => {
    if (path.startsWith('/wp-') || path.endsWith('.css') || path.endsWith('.js') || path.endsWith('.png') || path.endsWith('.jpg') || path.includes('/wp-json/')) {
        return match; // leave assets alone
    }
    return `href="https://hmsolutions.ca${path}"`;
});

// Same for single quotes
html = html.replace(/href='https:\/\/minamedical\.ca([^']*)'/g, (match, path) => {
    if (path.startsWith('/wp-') || path.endsWith('.css') || path.endsWith('.js') || path.endsWith('.png') || path.endsWith('.jpg') || path.includes('/wp-json/')) {
        return match; 
    }
    return `href='https://hmsolutions.ca${path}'`;
});

// 5. Catch visible minamedical.ca text
html = html.replace(/>([^<]*?)minamedical\.ca([^<]*?)</gi, (match, before, after) => {
    return `>${before}hmsolutions.ca${after}<`;
});

// 6. Catch any lingering "Mina Medical" text in text nodes
html = html.replace(/>([^<]*?)Mina Medical([^<]*?)</gi, (match, before, after) => {
    return `>${before}HM SOLUTIONS${after}<`;
});

// 7. Catch explicit standalone word "Mina" in text nodes
html = html.replace(/>([^<]*?)\bMina\b([^<]*?)</gi, (match, before, after) => {
    return `>${before}HM SOLUTIONS${after}<`;
});

// 8. One edge case: schema JSON contains "minamedical.ca" which is technically not visible but good to clean if it's safe.
// It's safe to leave the asset URLs in JSON-LD, but we can rename the generic ones.
// I'll leave JSON-LD alone to avoid breaking SEO tags if they rely on the exact URL, but since this is a dummy site, it doesn't matter.

fs.writeFileSync('public/index.html', html);
console.log('Anonymization complete.');
