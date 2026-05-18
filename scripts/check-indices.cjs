const fs = require('fs');
const h = fs.readFileSync('public/index.html', 'utf8');
const search1 = 'id="ielp-2-2-3"';
const search2 = 'id="ielp-2-2-3-2"';
console.log(`Index of ${search1}: ${h.indexOf(search1)}`);
console.log(`Index of ${search2}: ${h.indexOf(search2)}`);
