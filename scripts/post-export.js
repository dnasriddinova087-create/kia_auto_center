const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Replace viewport meta tag with responsive mobile lock
  html = html.replace(
    /<meta name="viewport"[^>]*>/i,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />'
  );

  // Inject no-cache and anti-overflow reset
  if (!html.includes('Cache-Control')) {
    const metaTags = `
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="google" content="notranslate" />`;
    html = html.replace('<head>', '<head>' + metaTags);
  }

  // Inject strict anti-horizontal overflow styles
  const responsiveStyle = `
    <style id="mobile-responsive-reset">
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html, body {
        width: 100% !important;
        max-width: 100vw !important;
        overflow-x: hidden !important;
        position: relative;
      }
      #root {
        width: 100% !important;
        max-width: 100vw !important;
        overflow-x: hidden !important;
      }
    </style>
  `;
  html = html.replace('</head>', responsiveStyle + '\n</head>');

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('[post-export] Successfully injected mobile-responsive reset into dist/index.html');
}
