import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Aquí deberías implementar la lógica para buscar y validar el usuario en tu base de datos
    const hashedPassword = await bcrypt.hash(password, 10); // Ejemplo de hash de contraseña

    // Ejemplo de validación básica
    if (username === 'admin' && await bcrypt.compare(password, hashedPassword)) {
      return { id: 1, username: 'admin' }; // Ejemplo de usuario válido
    }
    return null; // Usuario no encontrado o contraseña incorrecta
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
