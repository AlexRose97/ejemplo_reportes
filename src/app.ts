// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importar cors
import reportRoutes from './services/report/report.routes';
import { setupSwagger } from './config/swagger';

const app = express();

// Configurar CORS
app.use(cors({
  origin: '*',  // Permitir solo solicitudes desde este dominio
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],       // Permitir solo estos métodos HTTP
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir solo estos encabezados
}));

app.use(bodyParser.json());

(async () => {
  try {
    app.use('/api/report', reportRoutes);
    setupSwagger(app);  // Configura Swagger
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
})();

export default app;
