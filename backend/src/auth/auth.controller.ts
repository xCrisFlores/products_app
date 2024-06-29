import { Controller, Request, Post, UseGuards } from '@nestjs/common'; // Importar decoradores y clases necesarias de NestJS
import { AuthGuard } from '@nestjs/passport'; // Importar AuthGuard de Passport para proteger las rutas
import { AuthService } from './auth.service'; // Importar el servicio AuthService para manejar la lógica de autenticación

@Controller('auth') // Definir el prefijo de ruta para el controlador
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inyectar el servicio AuthService en el constructor

  @Post('login') // Definir la ruta y el verbo HTTP para el endpoint de login
  @UseGuards(AuthGuard('local')) // Aplicar el guardia de autenticación local de Passport
  async login(@Request() req) { // Método para manejar la solicitud de login
    return this.authService.login(req.user); // Llamar al método login del AuthService y devolver el resultado
  }
}
