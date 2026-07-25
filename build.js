const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'index.html');
const outDir = path.join(__dirname, 'public');
const outPath = path.join(outDir, 'index.html');

let html = fs.readFileSync(srcPath, 'utf8');

// Replacements
html = html.replace('%%IMGBB_API_KEY%%', process.env.IMGBB_API_KEY || '');
html = html.replace('%%FIREBASE_API_KEY%%', process.env.FIREBASE_API_KEY || '');
html = html.replace('%%FIREBASE_AUTH_DOMAIN%%', process.env.FIREBASE_AUTH_DOMAIN || '');
html = html.replace('%%FIREBASE_PROJECT_ID%%', process.env.FIREBASE_PROJECT_ID || '');
html = html.replace('%%FIREBASE_STORAGE_BUCKET%%', process.env.FIREBASE_STORAGE_BUCKET || '');
html = html.replace('%%FIREBASE_MESSAGING_SENDER_ID%%', process.env.FIREBASE_MESSAGING_SENDER_ID || '');
html = html.replace('%%FIREBASE_APP_ID%%', process.env.FIREBASE_APP_ID || '');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

fs.writeFileSync(outPath, html);

// Copy assets over to public directory
const assets = ['arax-transparent.png', 'Brawl-Stars.png', 'favicon.png', 'Roblox-transparent.png'];
assets.forEach(asset => {
    const srcAsset = path.join(__dirname, asset);
    const outAsset = path.join(outDir, asset);
    if (fs.existsSync(srcAsset)) {
        fs.copyFileSync(srcAsset, outAsset);
    }
});

console.log('Build complete! Secrets injected into public/index.html');
