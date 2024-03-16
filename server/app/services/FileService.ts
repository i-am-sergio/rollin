
export async function getInfoConstancia(src: string): Promise<string[]> {
  try {
    const pdf = await import("pdfjs-dist");
    const pdfDocument = await pdf.getDocument(src).promise;
    const page = await pdfDocument.getPage(1);
    const content = await page.getTextContent();
    return content.items.map((item: any) => item.str);
  } catch (error) {
    console.error("Error al obtener elementos del PDF:", error);
    throw error;
  }
}


export async function validateData(
  items: string[],
  full_name: string,
  cui: string
): Promise<boolean> {
  try {
    const validateItem = (itemName: string, errorMessage: string): number => {
      const itemIndex = items.findIndex((item) => item === itemName);
      if (itemIndex === -1) {
        throw new Error(errorMessage);
      }
      return itemIndex + 2;
    };
    if (items.length === 0 || items[0] !== "CONSTANCIA DE MATRICULA") {
      throw new Error("No es una Constancia de Matrícula válida");
    }
    const cuiValueIndex = validateItem("C.U.I. :", "Error al Hallar CUI");
    if (items[cuiValueIndex] !== cui) {
      throw new Error(
        `No coincide el CUI ingresado con el de la Constancia de Matrícula`
      );
    }
    const nameValueIndex = validateItem("NOMBRE:", "Error al Hallar NOMBRE");
    const nameValue = items[nameValueIndex].replace(",", "");
    if (nameValue.toUpperCase() !== full_name.toUpperCase()) {
      throw new Error(
        `No coincide el nombre ingresado con el de la Constancia de Matrícula`
      );
    }
    const dateValueIndex = validateItem("FECHA:", "Error al Hallar FECHA");
    const dateString = items[dateValueIndex];
    const year = dateString.split("-")[0];
    const currentYear = new Date().getFullYear();
    if (year !== (currentYear - 2).toString()) {
      //quitar -1
      throw new Error(`La constancia no es del año actual`);
    }
    return true;
  } catch (error) {
    console.error("Error al validar los datos:", error);
    return false;
  }
}


export async function extractCourses(items: string[]): Promise<string[]> {
  try {
    const extractedCourses: string[] = [];
    let currentIndex: number = 71;
    while (currentIndex < items.length) {
      const currentCourse: string = items[currentIndex];
      if (
        currentCourse === currentCourse.toUpperCase() &&
        currentCourse.trim() !== ""
      ) {
        extractedCourses.push(currentCourse);
      }
      currentIndex += 17;
    }
    return extractedCourses;
  } catch (error) {
    console.error("Error al extraer los cursos:", error);
    throw error;
  }
}
