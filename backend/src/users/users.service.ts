import { Injectable } from '@nestjs/common';

export type User = any; // Definición del tipo de usuario

@Injectable()
export class UsersService {
  // Array simulado de usuarios con datos de ejemplo
  private readonly users = [
    { userId: 1, username: 'root', password: 'admin' },
    { userId: 2, username: 'cris', password: '1234' },
  ];

  /**
   * Método para encontrar un usuario por su nombre de usuario.
   * @param username Nombre de usuario para buscar.
   * @returns Promesa que resuelve a un objeto de usuario o undefined si no se encuentra.
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
