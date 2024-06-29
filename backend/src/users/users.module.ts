import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService], // Declara el servicio UsersService como proveedor dentro del módulo
  exports: [UsersService], // Exporta UsersService para que pueda ser utilizado por otros módulos que importen UsersModule
})
export class UsersModule {}
