import { Request, Response } from 'express';
const XLSXPopulate = require('xlsx-populate');
import { dataDummy } from '../../utils/dataDummy';
import htmlPdf from 'html-pdf-node';

interface Product {
  name: string;
  quantity: number;
  price: number;
}
/**
 * @swagger
 * /report/xlsx:
 *   get:
 *     summary: Generates an XLSX report
 *     description: This endpoint generates an XLSX report from local data.
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: XLSX report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportResponse'
 *       500:
 *         description: Internal server error
 */
export const getXLSXReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const workbook = await XLSXPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);

    sheet.cell("A1").value("Reporte de Productos");
    sheet.cell("A2").value(`Tienda: ${dataDummy.store}`);
    sheet.cell("A3").value(`Fecha: ${dataDummy.date}`);
    sheet.cell("A4").value(`Ubicación: ${dataDummy.location}`);

    sheet.cell("A6").value("Producto");
    sheet.cell("B6").value("Cantidad");
    sheet.cell("C6").value("Precio");

    dataDummy.products.forEach((product: Product, index: number) => {
      const row = 7 + index;
      sheet.cell(`A${row}`).value(product.name);
      sheet.cell(`B${row}`).value(product.quantity);
      sheet.cell(`C${row}`).value(product.price);
    });

    res.setHeader('Content-Disposition', 'attachment; filename="ejemplo.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    const buffer = await workbook.outputAsync();
    res.status(200).send(buffer); // Asegúrate de usar status(200)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};


/**
 * @swagger
 * /report/pdf:
 *   get:
 *     summary: Generates a PDF report
 *     description: This endpoint generates a PDF report from local data.
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: PDF report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReportResponse'
 *       500:
 *         description: Internal server error
 */
export const getPDFReport = async (req: Request, res: Response): Promise<void> => {
  try {
    // Generar HTML para el PDF
    const html = `
      <h1>Reporte de Productos</h1>
      <p><strong>Tienda:</strong> ${dataDummy.store}</p>
      <p><strong>Fecha:</strong> ${dataDummy.date}</p>
      <p><strong>Ubicación:</strong> ${dataDummy.location}</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Producto</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Precio</th>
        </tr>
        ${dataDummy.products.map(product => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${product.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${product.price}</td>
          </tr>
        `).join('')}
      </table>
    `;

    // Crear PDF a partir del HTML
    const file = { content: html };
    const pdfBuffer = await htmlPdf.generatePdf(file, { format: 'A4' });

    // Configurar la respuesta para enviar el PDF
    res.setHeader('Content-Disposition', 'attachment; filename="reporte.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};