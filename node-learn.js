const http = require('http');
const { URL } = require('url');

const user = {
  id: 1,
  name: 'Jan',
  email: 'jan@example.com'
};

const products = [
  { id: 1, name: 'Product A', price: 29.99 },
  { id: 2, name: 'Product B', price: 49.99 },
  { id: 3, name: 'Product C', price: 19.99 }
];

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET' && pathname === '/user') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found\n');
});

if (req.method === 'GET' && pathname === '/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
    return;
  }



server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
