const http = require('http');

http.get('http://localhost:3000/places/details/68ee4d59ff001c380ff96ca4', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
        const json = JSON.parse(data);
        console.log(JSON.stringify(json.details?.npcs, null, 2));
    } catch (e) {
        console.log("Error parsing:", e.message);
        console.log("Data:", data);
    }
  });
});
