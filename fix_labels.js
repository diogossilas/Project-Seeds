import fs from 'fs';
let code = fs.readFileSync('src/components/atlas/WorldMapPaths.tsx', 'utf8');

const regex = /<g id="continent-labels-layer"[\s\S]*?<\/g>/;
const match = code.match(regex);
if (match) {
  let labelsCode = match[0];
  labelsCode = labelsCode.replace(/y="(\d+)"/g, (m, p1) => {
    return `y="${Math.round(parseInt(p1) * 0.5625)}"`;
  });
  code = code.replace(regex, labelsCode);
  fs.writeFileSync('src/components/atlas/WorldMapPaths.tsx', code);
}
