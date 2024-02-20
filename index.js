const express = require("express");
const fs = require("fs").promises;

const app = express();
const port = 5000;

async function getItems(src) {
  try {
    const pdfjs = await import("pdfjs-dist");
    const pdf = await pdfjs.getDocument(src).promise;
    const page = await pdf.getPage(1);
    const content = await page.getTextContent();
    const items = content.items.map((item) => item.str);
    return items;
  } catch (error) {
    console.error("Error al obtener elementos del PDF:", error);
    throw error;
  }
}

async function saveItemsToFile(items, filePath) {
  try {
    const text = items.join("\n");
    await fs.writeFile(filePath, text);
    console.log("Items guardados en constancia.txt");
  } catch (error) {
    console.error("Error al guardar los items:", error);
  }
}

app.get("/", async (req, res) => {
  try {
    // Ruta del archivo PDF
    const pdfPath = "constancia.pdf";

    // Obtener los elementos del PDF
    const items = await getItems(pdfPath);

    // Enviar los elementos como respuesta
    res.send(items);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
