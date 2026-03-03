<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>
  <xsl:template match="/">
    <html lang="en" data-color-scheme="dark">
      <head>
        <title>Sitemap - Jaimin Chandarana</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="/style.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
        <style>
          body {
            padding: 40px 20px;
            max-width: 900px;
            margin: 0 auto;
            background-color: var(--color-background);
            color: var(--color-text);
            font-family: var(--font-family-base);
          }
          .sitemap-container {
            background: var(--color-surface);
            border-radius: var(--radius-lg);
            padding: 30px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--color-border);
          }
          .sitemap-header {
            margin-bottom: 30px;
            text-align: center;
          }
          .sitemap-header h1 {
            color: var(--color-primary);
            margin-bottom: 10px;
            font-size: var(--font-size-3xl);
          }
          .sitemap-header p {
            color: var(--color-text-secondary);
            font-size: var(--font-size-md);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            text-align: left;
            padding: 12px;
            border-bottom: 2px solid var(--color-border);
            color: var(--color-text-secondary);
            font-weight: 600;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid var(--color-border);
            font-size: var(--font-size-md);
          }
          tr:hover td {
            background: var(--color-secondary);
          }
          .url-link {
            color: var(--color-primary);
            text-decoration: none;
            word-break: break-all;
            transition: color 0.2s;
          }
          .url-link:hover {
            color: var(--color-primary-hover);
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: var(--radius-sm);
            font-size: var(--font-size-sm);
            background: var(--color-secondary);
            color: var(--color-text);
            border: 1px solid var(--color-border);
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
            color: var(--color-text-secondary);
            text-decoration: none;
            transition: color 0.2s;
            font-weight: 500;
          }
          .back-link:hover {
            color: var(--color-primary);
          }
          @media (max-width: 600px) {
            .hide-mobile { display: none; }
          }
        </style>
      </head>
      <body>
        <a href="/" class="back-link"><i class="fas fa-arrow-left"></i> Back to Portfolio</a>
        <div class="sitemap-container">
          <div class="sitemap-header">
            <h1>XML Sitemap</h1>
            <p>This is a human-readable representation of this site's XML Sitemap.</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th class="hide-mobile">Priority</th>
                <th class="hide-mobile">ChangeFreq</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td>
                    <a class="url-link">
                      <xsl:attribute name="href">
                        <xsl:value-of select="s:loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="s:loc"/>
                    </a>
                  </td>
                  <td class="hide-mobile"><span class="badge"><xsl:value-of select="s:priority"/></span></td>
                  <td class="hide-mobile"><span class="badge"><xsl:value-of select="s:changefreq"/></span></td>
                  <td><xsl:value-of select="s:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
