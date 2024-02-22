import { getDocument } from "pdfjs-dist";

export async function getInfoConstancia(src) {
    try {
        // const pdfjs = await import("pdfjs-dist");
        const pdf = await getDocument(src).promise;
        const page = await pdf.getPage(1);
        const content = await page.getTextContent();
        return content.items.map((item) => item.str);
    } catch (error) {
        console.error("Error al obtener elementos del PDF:", error);
        throw error;
    }
}

export async function extractCourses(items) {
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

