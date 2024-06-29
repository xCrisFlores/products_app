import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller('products') // Define el prefijo de la ruta para este controlador como '/products'
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint para obtener todos los productos (sin protección de autenticación)
  @Get()
  async getProducts(): Promise<any> {
    try {
      return await this.appService.getProducts(); // Llama al método del servicio para obtener todos los productos
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Maneja errores y lanza una excepción HTTP si falla el servicio
    }
  }

  // Endpoint para obtener un producto por su ID, protegido por JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<any> {
    try {
      return await this.appService.getProductById(id); // Llama al método del servicio para obtener un producto por ID
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Maneja errores y lanza una excepción HTTP si falla el servicio
    }
  }

  // Endpoint para agregar un nuevo producto, protegido por JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Post()
  async newProduct(@Body() product: any): Promise<any> {
    try {
      return await this.appService.addProduct(product); // Llama al método del servicio para agregar un nuevo producto
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Maneja errores y lanza una excepción HTTP si falla el servicio
    }
  }

  // Endpoint para actualizar un producto por su ID, protegido por JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() product: any): Promise<any> {
    try {
      return await this.appService.updateProduct(id, product); // Llama al método del servicio para actualizar un producto por ID
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Maneja errores y lanza una excepción HTTP si falla el servicio
    }
  }

  // Endpoint para eliminar un producto por su ID, protegido por JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    try {
      return await this.appService.deleteProduct(id); // Llama al método del servicio para eliminar un producto por ID
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Maneja errores y lanza una excepción HTTP si falla el servicio
    }
  }
}
