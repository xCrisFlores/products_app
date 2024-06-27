import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getProducts(): Promise<any> {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getProductById(id: string): Promise<any> {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addProduct(product: any): Promise<any> {
    try {
      const response = await axios.post('https://dummyjson.com/products/add', product);
      
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateProduct(id: string, product: any): Promise<any> {
    try {
      const response = await axios.put(`https://dummyjson.com/products/${id}`, product);
      
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteProduct(id: string): Promise<any> {
    try {
      const response = await axios.delete(`https://dummyjson.com/products/${id}`);
      
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data;
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
