import fs from 'fs';
import path from 'path';

const dist_public_path = path.join(__dirname, '..', 'dist', 'public');

fs.mkdirSync(dist_public_path);

fs.cpSync(path.join(__dirname, '..', 'public'), dist_public_path, {
  recursive: true,
});
