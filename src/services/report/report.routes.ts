import { Router } from 'express';
import { getXLSXReport, getPDFReport } from './controllers/report.controller';

const router: Router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     ReportResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message indicating report creation
 *         data:
 *           type: string
 *           description: Placeholder for report data
 *       example:
 *         message: Reporte Creado
 *         data: ""
 */
router.get('/xlsx', getXLSXReport);
router.get('/pdf', getPDFReport);

export default router;
