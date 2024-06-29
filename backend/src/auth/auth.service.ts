import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Inyección del servicio UsersService para interactuar con usuarios
    private jwtService: JwtService // Inyección del servicio JwtService para la gestión de JWT
  ) {}

  // Método para validar las credenciales del usuario
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username); // Buscar el usuario por nombre de usuario
    if (user && user.password === pass) { // Verificar si el usuario existe y la contraseña coincide
      const { password, ...result } = user; // Excluir la contraseña del resultado
      return result; // Devolver el usuario sin la contraseña si las credenciales son válidas
    }
    return null; // Devolver nulo si las credenciales no son válidas o el usuario no existe
  }

  // Método para generar un token de acceso JWT después del inicio de sesión exitoso
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }; // Payload del token JWT con nombre de usuario y ID de usuario
    return {
      access_token: this.jwtService.sign(payload), // Firmar y devolver el token de acceso JWT
    };
  }
}
