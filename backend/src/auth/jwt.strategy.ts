import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants'; // Importar las constantes relacionadas con JWT

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraer el token JWT del encabezado de autorización
      ignoreExpiration: false, // No ignorar la expiración del token JWT
      secretOrKey: jwtConstants.secret, // Clave secreta para verificar la firma del token JWT
    });
  }

  // Método para validar y transformar el payload del token JWT
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Devolver el ID de usuario y el nombre de usuario desde el payload del token
  }
}
