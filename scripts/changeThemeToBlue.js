import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to convert HEX to RGB
function hexToRgb(hex) {
    let r = 0, g = 0, b = 0, a = null;
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3 || cleanHex.length === 4) {
        r = parseInt(cleanHex[0] + cleanHex[0], 16);
        g = parseInt(cleanHex[1] + cleanHex[1], 16);
        b = parseInt(cleanHex[2] + cleanHex[2], 16);
        if (cleanHex.length === 4) a = parseInt(cleanHex[3] + cleanHex[3], 16);
    } else if (cleanHex.length === 6 || cleanHex.length === 8) {
        r = parseInt(cleanHex.substring(0, 2), 16);
        g = parseInt(cleanHex.substring(2, 4), 16);
        b = parseInt(cleanHex.substring(4, 6), 16);
        if (cleanHex.length === 8) a = parseInt(cleanHex.substring(6, 8), 16);
    }
    return { r, g, b, a };
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s, l };
}

// Convert HSL back to RGB
function hslToRgb(h, s, l) {
    let r, g, b;
    h /= 360;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// Convert RGB to HEX
function rgbToHex({ r, g, b, a }) {
    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    let hex = '#' + toHex(r) + toHex(g) + toHex(b);
    if (a !== null && !isNaN(a)) hex += toHex(a);
    return hex;
}

const targetHue = 210; // Tech blue

function convertHexIfNeeded(hexStr) {
    const rgb = hexToRgb(hexStr);
    if (isNaN(rgb.r) || isNaN(rgb.g) || isNaN(rgb.b)) return hexStr;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // Target warm colors: essentially hues from 0 to 65 (Red -> Orange -> Yellow)
    // and explicitly very high like 340 to 360 for reds
    if ((hsl.h >= 0 && hsl.h <= 65) || (hsl.h >= 340 && hsl.h <= 360)) {
        if (hsl.s > 0.1) {
            hsl.h = targetHue;
            const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            newRgb.a = rgb.a;
            let result = rgbToHex(newRgb);
            return typeof result === 'string' ? result : hexStr;
        }
    }
    return hexStr;
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else {
            if (['.css', '.js', '.json', '.svg', '.html'].includes(path.extname(fullPath))) {
                let content = fs.readFileSync(fullPath, 'utf8');
                const regex = /#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
                let modified = false;
                
                content = content.replace(regex, (match) => {
                    const converted = convertHexIfNeeded(match);
                    if (converted !== match && converted.startsWith('#')) {
                        modified = true;
                        return match === match.toUpperCase() ? converted.toUpperCase() : converted;
                    }
                    return match;
                });

                if (modified) {
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Updated colors in ${fullPath}`);
                }
            }
        }
    }
}

console.log('Starting color conversion...');
processDirectory(path.join(__dirname, '../public'));
console.log('Conversion complete!');
