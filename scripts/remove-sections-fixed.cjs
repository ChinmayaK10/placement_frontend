const fs = require('fs');

function removeSectionSafely(html, id) {
    const searchStr = `id="${id}"`;
    let startIndex = -1;
    let fromIndex = 0;
    
    while (true) {
        startIndex = html.indexOf(searchStr, fromIndex);
        if (startIndex === -1) {
            console.log(`ID ${id} not found`);
            return html;
        }
        
        const nextChar = html[startIndex + searchStr.length];
        // The searchStr already ends with a quote if we pass the ID.
        // Wait, if id is ielp-2-2-3, searchStr is id="ielp-2-2-3".
        // If html has id="ielp-2-2-3", the char after searchStr is " (the closing quote).
        // Wait, NO. If id is ielp-2-2-3, searchStr is id="ielp-2-2-3".
        // The html has id="ielp-2-2-3". The index of id="ielp-2-2-3" ends at the character '3'.
        // Wait, let's look at the searchStr definition again.
        // searchStr = 'id="' + id + '"'; // searchStr.length includes the second quote.
        
        // If html has id="ielp-2-2-3", index of searchStr finds it. 
        // The character at startIndex + searchStr.length is the one AFTER the second quote.
        
        const charAfterQuote = html[startIndex + searchStr.length];
        // This is safe. If it was id="ielp-2-2-3-2", searchStr ("id=\"ielp-2-2-3\"") 
        // wouldn't match because the '-' doesn't match the '"'.
        
        // EXACT MATCH FOUND.
        break;
    }

    let tagStartIndex = html.lastIndexOf('<', startIndex);
    if (tagStartIndex === -1) return html;

    let depth = 0;
    let pos = tagStartIndex;
    
    while (pos < html.length) {
        if (html.startsWith('<div', pos)) {
            depth++;
            pos += 4;
        } else if (html.startsWith('</div>', pos)) {
            depth--;
            pos += 6;
            if (depth === 0) {
                // If the next character is a <br/>, remove it too to avoid gap
                let nextPos = pos;
                if (html.substring(nextPos, nextPos + 4) === '<br ') {
                    const brEnd = html.indexOf('>', nextPos);
                    if (brEnd !== -1) pos = brEnd + 1;
                }
                return html.substring(0, tagStartIndex) + html.substring(pos);
            }
        } else {
            pos++;
        }
    }
    return html;
}

let html = fs.readFileSync('public/index.html', 'utf8');

console.log('Removing Companies section (ielp-2-2-3)...');
html = removeSectionSafely(html, 'ielp-2-2-3');

console.log('Removing Community section (ielp-2-2-2-2)...');
html = removeSectionSafely(html, 'ielp-2-2-2-2');

console.log('Removing Mock Interview block (ist4h-2-5)...');
html = removeSectionSafely(html, 'ist4h-2-5');

fs.writeFileSync('public/index.html', html);
console.log('Successfully removed targeted elements.');
