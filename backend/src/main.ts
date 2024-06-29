import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger para documentar la API
  const config = new DocumentBuilder()
    .setTitle('Products API') // Título de la API
    .setDescription('The products API description') // Descripción de la API
    .setVersion('1.0') // Versión de la API
    .addBearerAuth({ // Configuración de autenticación JWT
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }, 'access-token') // Nombre del esquema de autenticación
    .build();
  
  const document = SwaggerModule.createDocument(app, config); // Crea el documento Swagger
  SwaggerModule.setup('api', app, document); // Configura Swagger en la ruta /api

  // Habilita CORS para permitir solicitudes desde localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000', // Origen permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  });

  await app.listen(3001); // Escucha en el puerto 3001
}

bootstrap();
