import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'; // Ruta correcta basada en tu árbol de archivos
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Se ejecuta automáticamente cuando el backend se enciende con éxito
  async onModuleInit() {
    await this.runSeed();
  }

  async runSeed() {
    // 1. Buscar si ya existe algún usuario con el rol de admin
    const adminExists = await this.userRepository.findOne({
      where: { rol: 'admin' },
    });

    if (!adminExists) {
      console.log('No se encontró un administrador. Creando administrador inicial...');

      // 2. Encriptar la contraseña de acceso
      const hashedPassword = await bcrypt.hash('Admin12345*', 10);

      // 3. Crear el nuevo registro usando la estructura de tu entidad User
      const newAdmin = this.userRepository.create({
        nombre: 'Administrador Principal',
        email: 'admin@burritolector.com',
        password: hashedPassword,
        rol: 'admin', // Coincide perfectamente con tu guard de Angular
      });

      // 4. Guardarlo físicamente en la Base de Datos
      await this.userRepository.save(newAdmin);

      console.log('¡Usuario administrador (admin@burritolector.com) creado con éxito en TypeORM!');
    } else {
      console.log('El administrador ya existe en la base de datos.');
    }
  }
}