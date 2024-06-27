import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getProducts(): Promise<any> {
    try {
      return await this.appService.getProducts();
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<any> {
    try {
      return await this.appService.getProductById(id);
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async newProduct(@Body() product: any): Promise<any> {
    try {
      return await this.appService.addProduct(product);
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() product: any): Promise<any> {
    try {
      return await this.appService.updateProduct(id, product);
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<any> {
    try {
      return await this.appService.deleteProduct(id);
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
