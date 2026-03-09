const http = require('http');

const data = JSON.stringify({
  title: "Test Title API Script",
  type: "Campaña",
  startLevel: 5,
  players: [],
  contents: []
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/narrative-arcs/69ae9d2a8475286ecc39a2c8/sessions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
