import { Strategy } from 'passport-local'; // Importar la estrategia local de Passport
import { PassportStrategy } from '@nestjs/passport'; // Importar la clase PassportStrategy de NestJS
import { Injectable, UnauthorizedException } from '@nestjs/common'; // Importar Injectable y UnauthorizedException de NestJS
import { AuthService } from './auth.service'; // Importar el servicio AuthService para validar usuarios

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // Llamar al constructor de PassportStrategy
  }

  // Método para validar las credenciales de usuario
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password); // Llamar al método validateUser del servicio AuthService

    if (!user) {
      throw new UnauthorizedException(); // Lanzar una excepción UnauthorizedException si las credenciales son inválidas
    }

    return user; // Devolver el usuario validado
  }
}
