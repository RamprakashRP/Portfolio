const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('src/data/experience.ts', 'utf8');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) { 
        results = results.concat(walk(fullPath));
      } else { 
        results.push(fullPath);
      }
    });
  } catch(e) {}
  return results;
}

const allFiles = walk('public/experience').map(p => p.replace(/\\/g, '/').replace('public', ''));

// Group by folder
const folders = {};
allFiles.forEach(file => {
  const dir = path.dirname(file);
  if (!folders[dir]) folders[dir] = [];
  folders[dir].push(file);
});

// Scoring function for sorting
function getScore(file) {
  const lower = file.toLowerCase();
  let score = 50; // default

  // Check extensions
  if (lower.endsWith('.pdf')) score -= 5; // pdfs first among equals

  // Keywords
  if (lower.includes('offer')) score = 10;
  else if (lower.includes('completion') || (lower.includes('certificate') && !lower.includes('appreciation'))) score = 20;
  else if (lower.includes('lor') || lower.includes('recommendation')) score = 30;
  else if (lower.includes('reveal') || lower.includes('poster')) score = 35;
  else if (lower.includes('appreciation')) score = 40;

  return score;
}

for (const dir in folders) {
  folders[dir].sort((a, b) => {
    return getScore(a) - getScore(b);
  });
}

// Now replace in experience.ts
// We know that experience.ts has images: [ ... ] which correspond to these folders.
// The easiest way is to look for the paths. Currently, the paths are like '/experience/google/top6/1.jpg'.
// We can use a regex to find all images: [ ... ] arrays, and based on the folder of the first item, replace the array.

content = content.replace(/images:\s*\[([\s\S]*?)\]/g, (match, arrayContent) => {
  const matchDir = arrayContent.match(/'(\/experience\/[^']+)\/[^']+'/);
  if (matchDir) {
    const dir = matchDir[1];
    if (folders[dir]) {
      const newImages = folders[dir].map(f => `\n          '${f}'`).join(',');
      return `images: [${newImages}\n        ]`;
    }
  }
  return match; // If not found, keep original
});

fs.writeFileSync('src/data/experience.ts', content, 'utf8');
console.log('experience.ts updated!');
