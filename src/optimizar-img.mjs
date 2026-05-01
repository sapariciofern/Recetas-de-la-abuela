import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./src/img";
const outputDir = "./src/img/img-optimizadas";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const inputPath = path.join(inputDir, file);

  if (ext === ".jpg" || ext === ".jpeg") {
    sharp(inputPath)
      .avif({ quality: 60 })
      .toFile(`${outputDir}/${base}.avif`)
      .catch((err) => console.error(`Error generando AVIF para ${file}:`, err));
  }

  if (ext === ".png") {
    sharp(inputPath)
      .webp({ quality: 70 })
      .toFile(`${outputDir}/${base}.webp`)
      .catch((err) => console.error(`Error generando WebP para ${file}:`, err));
  }
});
