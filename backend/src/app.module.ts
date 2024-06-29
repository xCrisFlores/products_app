import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; // Importa el módulo de autenticación
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule, // Importa el módulo de autenticación que contiene la lógica de autenticación JWT
    UsersModule, // Importa el módulo de usuarios que gestiona la lógica relacionada con los usuarios
  ],
  controllers: [AppController], // Declara el controlador principal que maneja las rutas de la aplicación
  providers: [AppService], // Declara el servicio principal que contiene la lógica de negocio de la aplicación
})
export class AppModule {}
