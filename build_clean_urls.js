const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const pages = [
  { name: 'shop', file: 'shop.html' },
  { name: 'explore', file: 'explore.html' },
  { name: 'learn', file: 'learn.html' },
  { name: 'media', file: 'media.html' },
  { name: 'about', file: 'about.html' },
  { name: 'dashboard', file: 'dashboard.html' },
  { name: 'checkout', file: 'checkout.html' },
  { name: 'product', file: 'product.html' },
  { name: '404', file: '404.html' }
];

function transformHtml(content) {
  let res = content;

  // Replace assets to root-relative
  res = res.replace(/href="styles\/main\.css"/g, 'href="/styles/main.css"');
  res = res.replace(/src="styles\/main\.css"/g, 'src="/styles/main.css"');
  res = res.replace(/src="js\//g, 'src="/js/');
  res = res.replace(/href="js\//g, 'href="/js/');
  res = res.replace(/src="assets\//g, 'src="/assets/');
  res = res.replace(/href="assets\//g, 'href="/assets/');

  // Replace links to clean folder paths
  res = res.replace(/href="index\.html"/g, 'href="/"');
  res = res.replace(/href="\/index\.html"/g, 'href="/"');
  res = res.replace(/href="shop\.html/g, 'href="/shop/');
  res = res.replace(/href="\/shop\.html/g, 'href="/shop/');
  res = res.replace(/href="explore\.html/g, 'href="/explore/');
  res = res.replace(/href="\/explore\.html/g, 'href="/explore/');
  res = res.replace(/href="learn\.html/g, 'href="/learn/');
  res = res.replace(/href="\/learn\.html/g, 'href="/learn/');
  res = res.replace(/href="media\.html/g, 'href="/media/');
  res = res.replace(/href="\/media\.html/g, 'href="/media/');
  res = res.replace(/href="about\.html/g, 'href="/about/');
  res = res.replace(/href="\/about\.html/g, 'href="/about/');
  res = res.replace(/href="dashboard\.html/g, 'href="/dashboard/');
  res = res.replace(/href="\/dashboard\.html/g, 'href="/dashboard/');
  res = res.replace(/href="checkout\.html/g, 'href="/checkout/');
  res = res.replace(/href="\/checkout\.html/g, 'href="/checkout/');
  res = res.replace(/href="product\.html/g, 'href="/product/');
  res = res.replace(/href="\/product\.html/g, 'href="/product/');

  // Replace JavaScript navigation calls
  res = res.replace(/window\.location\.href\s*=\s*'shop\.html'/g, "window.location.href='/shop/'");
  res = res.replace(/window\.location\.href\s*=\s*'checkout\.html'/g, "window.location.href='/checkout/'");
  res = res.replace(/window\.location\.href\s*=\s*'product\.html/g, "window.location.href='/product/");
  res = res.replace(/window\.location\.href\s*=\s*'explore\.html'/g, "window.location.href='/explore/'");
  res = res.replace(/window\.location\.href\s*=\s*'index\.html'/g, "window.location.href='/'");

  return res;
}

// 1. Update index.html
const indexFile = path.join(rootDir, 'index.html');
if (fs.existsSync(indexFile)) {
  const updatedIndex = transformHtml(fs.readFileSync(indexFile, 'utf8'));
  fs.writeFileSync(indexFile, updatedIndex, 'utf8');
  console.log('Updated index.html with clean URLs');
}

// 2. Create directory versions (e.g. shop/index.html)
pages.forEach(p => {
  const srcFile = path.join(rootDir, p.file);
  if (!fs.existsSync(srcFile)) return;

  const content = fs.readFileSync(srcFile, 'utf8');
  const transformed = transformHtml(content);

  const targetDir = path.join(rootDir, p.name);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, transformed, 'utf8');
  console.log(`Created ${p.name}/index.html`);

  // Write seamless redirect in the root .html file so old bookmarks/URLs redirect to clean /name/
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting to /${p.name}/...</title>
  <meta http-equiv="refresh" content="0; url=/${p.name}/">
  <script>
    var target = '/${p.name}/' + window.location.search + window.location.hash;
    window.location.replace(target);
  </script>
</head>
<body style="background:#0A0A0F; color:#F8FAFC; font-family:sans-serif; text-align:center; padding-top:20vh;">
  <p>Redirecting to <a href="/${p.name}/" style="color:#14B8A6;">/${p.name}/</a>...</p>
</body>
</html>`;

  fs.writeFileSync(srcFile, redirectHtml, 'utf8');
  console.log(`Configured ${p.file} -> /${p.name}/ redirect`);
});

console.log('Clean URLs generated successfully!');
