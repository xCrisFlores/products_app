import { Injectable, HttpException, HttpStatus } from '@nestjs/common'; // Importar decoradores y módulos necesarios de NestJS
import axios from 'axios'; // Importar axios para realizar peticiones HTTP

@Injectable()
export class AppService {
  
  // Método para obtener todos los productos
  async getProducts(): Promise<any> {
    try {
      const response = await axios.get('https://dummyjson.com/products'); // Realizar una petición GET a la API dummyjson
      
      // Si no se recibe datos válidos en la respuesta, lanzar una excepción HTTP
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data; // Devolver los datos obtenidos de la API
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Capturar errores y lanzar una excepción HTTP
    }
  }

  // Método para obtener un producto por su ID
  async getProductById(id: string): Promise<any> {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`); // Realizar una petición GET a la API dummyjson con un ID específico
      
      // Si no se recibe datos válidos en la respuesta, lanzar una excepción HTTP
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data; // Devolver los datos obtenidos de la API
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Capturar errores y lanzar una excepción HTTP
    }
  }

  // Método para agregar un nuevo producto
  async addProduct(product: any): Promise<any> {
    try {
      const response = await axios.post('https://dummyjson.com/products/add', product); // Realizar una petición POST para agregar un producto
      
      // Si no se recibe datos válidos en la respuesta, lanzar una excepción HTTP
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data; // Devolver los datos obtenidos de la API
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Capturar errores y lanzar una excepción HTTP
    }
  }

  // Método para actualizar un producto por su ID
  async updateProduct(id: string, product: any): Promise<any> {
    try {
      const response = await axios.put(`https://dummyjson.com/products/${id}`, product); // Realizar una petición PUT para actualizar un producto
      
      // Si no se recibe datos válidos en la respuesta, lanzar una excepción HTTP
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data; // Devolver los datos obtenidos de la API
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Capturar errores y lanzar una excepción HTTP
    }
  }

  // Método para eliminar un producto por su ID
  async deleteProduct(id: string): Promise<any> {
    try {
      const response = await axios.delete(`https://dummyjson.com/products/${id}`); // Realizar una petición DELETE para eliminar un producto
      
      // Si no se recibe datos válidos en la respuesta, lanzar una excepción HTTP
      if (!response.data) {
        throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response.data; // Devolver los datos obtenidos de la API
    } catch (error) {
      throw new HttpException("Fallo el servicio", HttpStatus.INTERNAL_SERVER_ERROR); // Capturar errores y lanzar una excepción HTTP
    }
  }
}
