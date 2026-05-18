const fs = require('fs');
const h = fs.readFileSync('public/index.html', 'utf8');
const targets = ['ielp-2-2-3', 'ielp-2-2-3-2', 'ielp-2-2-2-2', 'ist4h-2-5'];
targets.forEach(id => {
    const searchStr = `id="${id}"`;
    const count = h.split(searchStr).length - 1;
    console.log(`${id}: ${count}`);
});
