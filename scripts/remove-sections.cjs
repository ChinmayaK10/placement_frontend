const fs = require('fs');

function removeElementById(html, id) {
    const idAttr = `id="${id}"`;
    const startIndex = html.indexOf(idAttr);
    if (startIndex === -1) return html;

    // Find the start of the tag
    let tagStartIndex = html.lastIndexOf('<', startIndex);
    if (tagStartIndex === -1) return html;

    // We need to find the matching closing tag for this div (or whatever tag it is)
    // For simplicity, we assume it's a div and handle nesting by counting
    
    let depth = 0;
    let currentIndex = tagStartIndex;
    let foundEnd = false;

    while (currentIndex < html.length) {
        if (html.substring(currentIndex, currentIndex + 4) === '<div' || html.substring(currentIndex, currentIndex + 2) === '<p' || html.substring(currentIndex, currentIndex + 4) === '<img' || html.substring(currentIndex, currentIndex + 3) === '<br') {
            // Check if it's a self-closing tag or just a start tag
            // For this specific clone, almost everything is a div or img or br
            const tagMatch = html.substring(currentIndex).match(/^<([a-z0-9]+)/i);
            if (tagMatch) {
                const tagName = tagMatch[1].toLowerCase();
                const tagEndIndex = html.indexOf('>', currentIndex);
                const isSelfClosing = html.substring(tagEndIndex - 1, tagEndIndex) === '/' || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName);
                
                if (!isSelfClosing) {
                    depth++;
                }
                currentIndex = tagEndIndex + 1;
                continue;
            }
        } else if (html.substring(currentIndex, currentIndex + 2) === '</') {
            const tagMatch = html.substring(currentIndex).match(/^<\/([a-z0-9]+)>/i);
            if (tagMatch) {
                depth--;
                if (depth === 0) {
                    const tagEndIndex = currentIndex + tagMatch[0].length;
                    // Found the match
                    return html.substring(0, tagStartIndex) + html.substring(tagEndIndex);
                }
                currentIndex += tagMatch[0].length;
                continue;
            }
        }
        currentIndex++;
    }
    return html;
}

// A more robust way to remove a block if we know its structure is simple:
function removeSectionRobust(html, id) {
    // This regex looks for a div with the given id and tries to balance it.
    // However, since searching for balanced tags with regex is hard,
    // let's use a simpler approach: finding the ID and scanning forward for the matching </div>.
    
    const idIndex = html.indexOf(`id="${id}"`);
    if (idIndex === -1) {
        console.log(`ID ${id} not found`);
        return html;
    }
    
    const startTagIndex = html.lastIndexOf('<', idIndex);
    let depth = 0;
    let pos = startTagIndex;
    
    while (pos < html.length) {
        if (html.startsWith('<div', pos)) {
            depth++;
            pos += 4;
        } else if (html.startsWith('</div>', pos)) {
            depth--;
            pos += 6;
            if (depth === 0) {
                return html.substring(0, startTagIndex) + html.substring(pos);
            }
        } else {
            pos++;
        }
    }
    return html;
}

let html = fs.readFileSync('public/index.html', 'utf8');

console.log('Removing Companies section...');
html = removeSectionRobust(html, 'ielp-2-2-3');

console.log('Removing Community section...');
html = removeSectionRobust(html, 'ielp-2-2-2-2');

console.log('Removing Mock Interview block...');
html = removeSectionRobust(html, 'ist4h-2-5');

fs.writeFileSync('public/index.html', html);
console.log('Successfully removed sections.');
