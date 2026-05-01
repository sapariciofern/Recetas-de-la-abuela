import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./src/img";
const outputDir = "./src/img/img-width";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Lista EXACTA de imágenes que quieres procesar
const allowedImages = [
  "Cocido.jpg",
  "Cordero_Asado.jpg",
  "Huevos_Rotos.jpg",
  "Marmitako.jpg",
  "Paella_valenciana.jpg",
  "Papas_Arrugadas.jpg",
  "Pulpo_Gallega.jpg",
  "Quesada_Pasiega.jpg",
  "Salmorejo.jpg"
];

const sizes = [400, 600, 800, 1200];

fs.readdirSync(inputDir).forEach(file => {
  // Solo procesamos si está en la lista
  if (!allowedImages.includes(file)) return;

  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const inputPath = path.join(inputDir, file);

  if (ext === ".jpg" || ext === ".jpeg") {
    sizes.forEach(size => {
      sharp(inputPath)
        .resize(size)
        .avif({ quality: 60 })
        .toFile(`${outputDir}/${base}-${size}.avif`)
        .catch(err => console.error(`Error generando ${size}px para ${file}:`, err));
    });
  }
});
