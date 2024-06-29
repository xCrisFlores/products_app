import { Module } from '@nestjs/common'; // Importar el decorador Module de NestJS
import { AuthService } from './auth.service'; // Importar el servicio AuthService
import { AuthController } from './auth.controller'; // Importar el controlador AuthController
import { UsersModule } from '../users/users.module'; // Importar el módulo UsersModule para la gestión de usuarios
import { PassportModule } from '@nestjs/passport'; // Importar PassportModule para la integración con Passport
import { JwtModule } from '@nestjs/jwt'; // Importar JwtModule para la integración con JWT
import { LocalStrategy } from './local.strategy'; // Importar la estrategia LocalStrategy para autenticación local
import { JwtStrategy } from './jwt.strategy'; // Importar la estrategia JwtStrategy para autenticación JWT
import { jwtConstants } from './constants'; // Importar las constantes relacionadas con JWT

@Module({
  imports: [
    UsersModule, // Importar UsersModule para la gestión de usuarios
    PassportModule, // Importar PassportModule para la integración con Passport
    JwtModule.register({
      secret: jwtConstants.secret, // Configurar la clave secreta para JWT
      signOptions: { expiresIn: '60m' }, // Token válido por 60 minutos
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], // Definir los proveedores de servicios: AuthService, LocalStrategy, JwtStrategy
  controllers: [AuthController], // Definir los controladores que pertenecen a este módulo: AuthController
  exports: [AuthService], // Exportar el servicio AuthService para ser utilizado por otros módulos
})
export class AuthModule {} // Exportar la clase AuthModule como un módulo de NestJS
