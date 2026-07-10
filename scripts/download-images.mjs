import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFilePath = path.join(__dirname, '../public/dataset_linkedin-profile-posts_2026-07-09_22-40-18-388.json');
const outputJsonPath = path.join(__dirname, '../src/data/achievements.json');
const imagesDir = path.join(__dirname, '../public/achievements');

async function downloadImage(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filename, buffer);
    return true;
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
    return false;
  }
}

async function processPosts() {
  console.log('Reading JSON...');
  const rawData = fs.readFileSync(jsonFilePath, 'utf8');
  let posts = JSON.parse(rawData);

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Ensure src/data directory exists
  const dataDir = path.dirname(outputJsonPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  console.log(`Found ${posts.length} posts. Downloading images...`);

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    if (post.postImages && post.postImages.length > 0) {
      for (let j = 0; j < post.postImages.length; j++) {
        const image = post.postImages[j];
        const ext = 'jpg'; // Usually LinkedIn images are JPEGs or webp, let's assume jpg for extension but the browser handles content-type naturally.
        const fileName = `${post.id}_${j}.${ext}`;
        const filePath = path.join(imagesDir, fileName);

        console.log(`Downloading image ${j + 1} for post ${post.id}...`);
        const success = await downloadImage(image.url, filePath);
        
        if (success) {
          // Update the URL in the JSON to the local path
          image.url = `/achievements/${fileName}`;
        }
      }
    }
  }

  console.log('Writing updated JSON...');
  fs.writeFileSync(outputJsonPath, JSON.stringify(posts, null, 2), 'utf8');
  console.log('Done! Your achievements data is saved at src/data/achievements.json');
}

processPosts();
