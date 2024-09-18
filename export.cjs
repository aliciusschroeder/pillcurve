const fs = require('fs');
const path = require('path');

const ignoredFolders = ['node_modules', '.next', '.git'];
const ignoredFiles = ['pnpm-lock.yaml', 'whole_project.txt', 'export.cjs', 'next-env.d.ts'];
const includedExtensions = ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.html', '.json'];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!ignoredFolders.includes(file)) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else {
      if (!ignoredFiles.includes(file) && !file.startsWith('.') && includedExtensions.includes(path.extname(file))) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(__dirname);
let output = '';

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  output += `===== ${path.basename(file)} =====\n==Path: ${path.relative(__dirname, file)}==\n${content}\n\n\n`;
});

fs.writeFileSync('whole_project.txt', output);
console.log('Dateien erfolgreich exportiert.');