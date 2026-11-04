// Custom Web HTML Template for KIA AUTO CENTER
// Owner: Nasriddinova Dilfuza

import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="uz" translate="no" className="notranslate">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="google" content="notranslate" />
        <meta name="theme-color" content="#111111" />
        <title>KIA AUTO CENTER Uzbekistan — Rasmiy Dilerlik Markazi</title>
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              height: 100%;
              background-color: #111111;
              color: #FFFFFF;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }
            body {
              overflow-x: hidden;
              margin: 0;
              padding: 0;
            }
            #root {
              display: flex;
              min-height: 100%;
              flex: 1;
              background-color: #111111;
            }
            /* Prevent image drag and text selection quirks */
            * {
              -webkit-tap-highlight-color: transparent;
            }
          `
        }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Translate and DOM reconciliation safety patch for React
              if (typeof Node === 'function' && Node.prototype) {
                const origRemove = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                  if (child.parentNode !== this) {
                    if (console && console.warn) {
                      console.warn('Blocked removeChild from mismatched parent', child);
                    }
                    return child;
                  }
                  return origRemove.apply(this, arguments);
                };
                const origInsert = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, referenceNode) {
                  if (referenceNode && referenceNode.parentNode !== this) {
                    if (console && console.warn) {
                      console.warn('Blocked insertBefore from mismatched parent', referenceNode);
                    }
                    return newNode;
                  }
                  return origInsert.apply(this, arguments);
                };
              }
            `,
          }}
        />
      </head>
      <body className="notranslate" style={{ backgroundColor: '#111111' }}>
        {children}
      </body>
    </html>
  );
}
