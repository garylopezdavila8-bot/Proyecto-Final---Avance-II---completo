import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
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
    // 1. Buscar específicamente tu correo para obligar a la base de datos a revisar si existes
    const adminExists = await this.userRepository.findOne({
      where: { email: 'garylopezdavila8@gmail.com' },
    });

    if (!adminExists) {
      console.log('No se encontró tu cuenta de administrador. Creándola ahora...');

      // 2. Encriptar la nueva contraseña asignada: 112233
      const hashedPassword = await bcrypt.hash('112233', 10);

      // 3. Crear el nuevo registro con tus datos exactos y rol de admin
      const newAdmin = this.userRepository.create({
        nombre: 'Gary López',
        email: 'garylopezdavila8@gmail.com',
        password: hashedPassword,
        rol: 'admin',
      });

      // 4. Guardarlo físicamente en la Base de Datos (Clever Cloud MySQL)
      await this.userRepository.save(newAdmin);

      console.log('¡Usuario administrador (garylopezdavila8@gmail.com) creado con éxito con contraseña 112233!');
    } else {
      console.log('Tu administrador personal ya existe en la base de datos.');
    }
  }
}