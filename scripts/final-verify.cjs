const fs = require('fs');
const h = fs.readFileSync('public/index.html', 'utf8');
const removed = ['ielp-2-2-3', 'ielp-2-2-2-2', 'ist4h-2-5'];
const preserved = ['ielp-2-2-3-2', 'ielp-2-2-3-2-2', 'ielp-2-2-2-2-2-2'];

removed.forEach(id => {
    console.log(`${id} present: ${h.includes('id="' + id + '"')}`);
});
preserved.forEach(id => {
    console.log(`${id} present: ${h.includes('id="' + id + '"')}`);
});
