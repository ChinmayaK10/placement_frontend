const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const replacements = [
  [/WE'RE AN AI AGENCY/g, 'INTELLIGENCE FOR CAREER READINESS'],
  [/PLACERA X — AI agency cinematic experience\./g, 'PLACERA X — Intelligence For Career Readiness'],
  // And just in case Founder & CEO was not matched due to &amp;:
  ['Founder &amp; CEO', 'Senior Engineer']
];

let changedCount = 0;
for (const [search, replace] of replacements) {
    if (search instanceof RegExp) {
        if (html.match(search)) changedCount++;
        html = html.replace(search, replace);
    } else {
        const splitText = html.split(search);
        if (splitText.length > 1) {
            html = splitText.join(replace);
            changedCount++;
        }
    }
}

console.log('Replaced texts:', changedCount);
fs.writeFileSync('public/index.html', html);
