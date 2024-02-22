const express = require("express");
const multer = require("multer");
const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const timestamp = date.getTime();
    const originalname = file.originalname;
    const filename = `${timestamp}-${originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

async function getItems(src) {
  try {
    const pdfjs = await import("pdfjs-dist");
    const pdf = await pdfjs.getDocument(src).promise;
    const page = await pdf.getPage(1);
    const content = await page.getTextContent();
    return content.items.map((item) => item.str);
  } catch (error) {
    console.error("Error al obtener elementos del PDF:", error);
    throw error;
  }
}

async function extractCourses(items) {
  try {
    const extractedCourses = [];
    let currentIndex = 71;
    while (currentIndex < items.length) {
      const currentCourse = items[currentIndex];
      if (
        currentCourse === currentCourse.toUpperCase() &&
        currentCourse !== " "
      )
        extractedCourses.push(currentCourse);
      currentIndex += 17;
    }
    return extractedCourses;
  } catch (error) {
    console.error("Error al extraer los cursos:", error);
    throw error;
  }
}

app.get("/", async (req, res) => {
  try {
    const pdfPath = "20210689.pdf";
    const items = await getItems(pdfPath);
    const extractedCourses = await extractCourses(items);
    res.send(extractedCourses);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

app.post("/upload", upload.single("constancia"), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const items = await getItems(pdfPath);
    const extractedCourses = await extractCourses(items);
    res.send(extractedCourses);
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
