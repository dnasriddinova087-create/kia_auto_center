const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Inject no-cache meta tags if not already present
  if (!html.includes('Cache-Control')) {
    const metaTags = `
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="google" content="notranslate" />`;
    html = html.replace('<head>', '<head>' + metaTags);
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('[post-export] Successfully injected no-cache meta tags into dist/index.html');
  }
}
